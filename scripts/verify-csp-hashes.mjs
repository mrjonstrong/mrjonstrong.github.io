/**
 * Post-build script that verifies the inline script SHA-256 hashes in
 * public/_headers match what Astro actually produced in dist/.
 *
 * Exits with code 1 (failing the build) if there is a mismatch.
 * Run automatically via the "postbuild" npm script.
 */

import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST_DIR = "dist";
const HEADERS_FILE = "public/_headers";

/* ------------------------------------------------------------------ */
/*  1. Collect inline-script hashes from the built HTML               */
/* ------------------------------------------------------------------ */

/** Recursively find all .html files under a directory. */
function findHtmlFiles(dir) {
	const results = [];
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			results.push(...findHtmlFiles(full));
		} else if (full.endsWith(".html")) {
			results.push(full);
		}
	}
	return results;
}

/**
 * Return the set of SHA-256 hashes (base64) for every inline <script>
 * in the given HTML string.  Skips:
 *   - scripts with a src= attribute (external files)
 *   - <script type="speculationrules"> (JSON data block, not JS)
 */
function extractInlineScriptHashes(html) {
	const hashes = new Set();
	const re = /<script([^>]*)>([\s\S]*?)<\/script>/g;
	let m;
	// biome-ignore lint/suspicious/noAssignInExpressions: Standard regex matching pattern
	while ((m = re.exec(html)) !== null) {
		const attrs = m[1];
		const body = m[2];
		if (!body.trim()) continue;
		if (/(?:^|\s)src\s*=/.test(attrs)) continue;
		if (/speculationrules/.test(attrs)) continue;
		const hash = createHash("sha256").update(body).digest("base64");
		hashes.add(`sha256-${hash}`);
	}
	return hashes;
}

const htmlFiles = findHtmlFiles(DIST_DIR);
if (htmlFiles.length === 0) {
	console.error("ERROR: No HTML files found in dist/. Was the build successful?");
	process.exit(1);
}

const buildHashes = new Set();
for (const file of htmlFiles) {
	const html = readFileSync(file, "utf-8");
	for (const h of extractInlineScriptHashes(html)) {
		buildHashes.add(h);
	}
}

if (buildHashes.size === 0) {
	console.warn(
		"WARNING: No inline scripts found in build output. This may indicate an issue with the build or hash extraction.",
	);
}
/* ------------------------------------------------------------------ */
/*  2. Extract sha256-* hashes from the CSP in public/_headers        */
/* ------------------------------------------------------------------ */

const headersContent = readFileSync(HEADERS_FILE, "utf-8");

/**
 * Extract the full CSP value, handling multi-line headers.
 * HTTP headers can span multiple lines when continuation lines start with
 * whitespace (space or tab) per RFC 7230 (obsoletes RFC 2616).
 *
 * A line is considered a new header if it contains a colon after non-whitespace
 * characters, indicating a "Header-Name: value" pattern.
 */
function extractCspValue(content) {
	const lines = content.split(/\r?\n/);
	let cspValue = null;
	let inCsp = false;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		// Start of CSP header
		if (/^\s*Content-Security-Policy:\s*/i.test(line)) {
			cspValue = line.replace(/^\s*Content-Security-Policy:\s*/i, "");
			inCsp = true;
			continue;
		}

		// If we're processing CSP
		if (inCsp) {
			// Check if this line looks like a new header (has header-name: pattern)
			// after trimming leading whitespace
			const trimmed = line.trim();
			if (trimmed && /^[A-Za-z0-9-]+:\s+/.test(trimmed)) {
				// This is a new header, stop processing CSP
				break;
			}

			// Continuation line (starts with whitespace and is not a new header)
			if (/^[\s\t]/.test(line) && trimmed) {
				cspValue += ` ${trimmed}`;
				continue;
			}

			// Empty line or non-continuation line ends the CSP
			if (trimmed === "") {
				break;
			}
		}
	}

	return cspValue;
}

const cspValue = extractCspValue(headersContent);
if (!cspValue) {
	console.error("ERROR: No Content-Security-Policy found in", HEADERS_FILE);
	process.exit(1);
}

const cspHashes = new Set();
const hashRe = /["'](sha256-[A-Za-z0-9+/]+=*)["']/g;
let hm;
// biome-ignore lint/suspicious/noAssignInExpressions: Standard regex matching pattern
while ((hm = hashRe.exec(cspValue)) !== null) {
	cspHashes.add(hm[1]);
}

/* ------------------------------------------------------------------ */
/*  3. Compare                                                        */
/* ------------------------------------------------------------------ */

const inBuildNotCsp = [...buildHashes].filter((h) => !cspHashes.has(h));
const inCspNotBuild = [...cspHashes].filter((h) => !buildHashes.has(h));

if (inBuildNotCsp.length === 0 && inCspNotBuild.length === 0) {
	console.log(`CSP hash check passed — ${buildHashes.size} inline script hash(es) verified.`);
	process.exit(0);
}

console.error("CSP hash mismatch detected!\n");

if (inBuildNotCsp.length > 0) {
	console.error("Inline scripts in build output missing from CSP (add these):");
	for (const h of inBuildNotCsp) console.error(`  '${h}'`);
}

if (inCspNotBuild.length > 0) {
	console.error("Hashes in CSP that no longer match any inline script (remove these):");
	for (const h of inCspNotBuild) console.error(`  '${h}'`);
}

console.error("\nUpdate the sha256 hashes in public/_headers to match the build output.");
process.exit(1);
