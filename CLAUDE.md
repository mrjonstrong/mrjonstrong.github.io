# CLAUDE.md

This file provides guidance for Claude Code when working in this repository.

## Project Overview

Personal infosec blog for **Jonathan Strong** (`jonathanstrong.org`), migrated from Jekyll/GitHub Pages to **Astro** using the [astro-theme-cactus](https://github.com/chrismwilliams/astro-theme-cactus) template, deployed on **Cloudflare Pages**.

## Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Start dev server (http://localhost:4321)
pnpm build          # Production build -> dist/
pnpm preview        # Preview production build locally
pnpm check          # Type check (astro check) + lint (biome check)
pnpm lint           # Auto-fix lint issues with biome
pnpm format         # Format with prettier
pnpm audit          # Check for known vulnerabilities
```

## Branch Strategy

- `main` — production (jonathanstrong.org)
- `develop` — integration branch
- `claude/*` — Claude Code feature branches, always branch from `develop`
- All PRs require review before merging to `main` or `develop`

## Architecture

- **Framework:** Astro 5 (static output)
- **Theme:** astro-theme-cactus
- **Styling:** Tailwind CSS v4
- **Package manager:** pnpm (do not use npm or yarn)
- **Deployment:** Cloudflare Pages (build command: `pnpm build`, output: `dist/`)
- **Node version:** 22 (see `.nvmrc`)

## Content

Blog posts live in `src/content/post/` as `.md` or `.mdx` files.

### Required frontmatter

```yaml
---
title: "Post title"          # max 60 characters — enforced by schema
description: "SEO summary"   # required, shown in post listings
publishDate: "YYYY-MM-DD"
tags: ["tag1", "tag2"]       # array, not space-separated string
draft: true                  # omit or set false for published posts
---
```

### URL structure

Posts are served at `/posts/[slug]` where slug is the **lowercased** filename (Astro lowercases all slugs automatically). Example: `src/content/post/Password-Managers.md` → `/posts/password-managers`.

Old Jekyll URLs at the site root redirect to the new paths via `public/_redirects` (Cloudflare Pages redirects).

### Images

Place images in `public/images/` and reference as `/images/filename.jpg`.

## Key Files

| File | Purpose |
|------|---------|
| `src/site.config.ts` | Site title, description, author, URL, nav menu |
| `astro.config.ts` | Astro integrations, markdown plugins, env schema |
| `src/content.config.ts` | Content collection schemas (post, note, tag) |
| `src/components/SocialList.astro` | Footer social links |
| `src/pages/about.astro` | About page |
| `public/_redirects` | Cloudflare Pages URL redirects |
| `public/images/` | Static images |
| `.github/workflows/` | CI: super-linter, trivy, chainbench |
| `.github/dependabot.yml` | Auto-updates: npm + github-actions daily to `develop` |

## Security

- **Never** commit secrets, API keys, or `.env` files
- **Never** disable security scanning workflows (trivy, chainbench, super-linter)
- Keep dependencies up to date — run `pnpm audit` and `pnpm update --latest` periodically
- The `pnpm.overrides` section in `package.json` contains security patches for transitive dependencies — do not remove them without checking `pnpm audit` first

## CI Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `super-linter.yml` | push/PR to main, develop | Lints Markdown, YAML, TypeScript |
| `trivy.yml` | weekly + push/PR | Filesystem vulnerability scanning |
| `chainbench.yml` | scheduled | Supply chain security |

Super-linter excludes `dist/` and `.astro/` (build artifacts).

## Cloudflare Pages Setup

- **Production branch:** `main`
- **Preview branch:** `claude/migrate-jekyll-astro-xYafH` → `preview.jonathanstrong.org`
- **Build command:** `pnpm build`
- **Output directory:** `dist`
- **Environment variable:** `NODE_VERSION=22`
