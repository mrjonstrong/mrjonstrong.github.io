/**
 * Post-build script that verifies the inline script SHA-256 hashes in
 * public/_headers match what Astro actually produced in dist/.
 *
 * Exits with code 1 (failing the build) if there is a mismatch.
 * Run automatically via the "postbuild" npm script.
 */

import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
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

/* ------------------------------------------------------------------ */
/*  2. Extract sha256-* hashes from the CSP in public/_headers        */
/* ------------------------------------------------------------------ */

const headersContent = readFileSync(HEADERS_FILE, "utf-8");
const cspMatch = headersContent.match(/Content-Security-Policy:\s*(.+)/);
if (!cspMatch) {
	console.error("ERROR: No Content-Security-Policy found in", HEADERS_FILE);
	process.exit(1);
}

const cspHashes = new Set();
const hashRe = /["'](sha256-[A-Za-z0-9+/]+=*)["']/g;
let hm;
while ((hm = hashRe.exec(cspMatch[1])) !== null) {
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
