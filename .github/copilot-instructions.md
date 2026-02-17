# GitHub Copilot Repository Instructions

This repository is a personal infosec blog built with Astro using the Cactus theme, deployed on Cloudflare Pages.

## Project Overview

- **Type**: Astro static site (astro-theme-cactus)
- **Purpose**: Personal blog about information security
- **Deployment**: Cloudflare Pages
- **Theme**: Cactus (dark/light mode)
- **Package Manager**: pnpm

## Build & Test Commands

### Local Development

```bash
# Install dependencies
pnpm install

# Build the site
pnpm build

# Serve the site locally with hot reload
pnpm dev

# Preview production build
pnpm preview

# Type check and lint
pnpm check
```

### Linting

```bash
# The repository uses GitHub Super Linter which runs automatically on PRs
# Biome is used for code linting: pnpm check
# Prettier is used for formatting: pnpm format
```

## Code Style & Conventions

### Blog Posts

- Blog posts go in `src/content/post/` directory as `.md` or `.mdx` files
- Use frontmatter for all posts:
  ```yaml
  ---
  title: "Your Title" # max 60 characters
  description: "A short description for SEO"
  publishDate: "YYYY-MM-DD"
  tags: ["tag1", "tag2"]
  draft: false # set true for drafts
  ---
  ```

### Directory Structure

- `src/content/post/`: Blog posts
- `src/components/`: Astro components
- `src/layouts/`: Page layouts
- `src/pages/`: File-based routing pages
- `src/styles/`: Global styles (Tailwind CSS v4)
- `public/`: Static assets (images, redirects, icons)
- `dist/`: Generated site output (built by Astro)

## Workflow & Branching

- Main branch: `main` (production)
- Development branch: `develop`
- Feature branches should be created from `develop`
- All changes require PR review before merging
- Super Linter runs on pushes to `main` and `develop` branches and on all PRs

## Security & Boundaries

### DO NOT:

- Commit secrets, API keys, or credentials
- Modify security scanning workflows without careful consideration
- Edit files in `dist/` directory (auto-generated)
- Change `.github/workflows/` files unless specifically requested
- Remove or disable security scanning tools (Trivy, Chainbench)

### DO:

- Follow security best practices in blog posts
- Keep dependencies up to date
- Review Dependabot alerts promptly
- Maintain code quality and security standards enforced by CI tools

## Astro Features

The site uses the following Astro integrations:

- `@astrojs/mdx`: MDX support
- `@astrojs/sitemap`: Automatic sitemap generation
- `@astrojs/rss`: RSS feed generation
- `astro-expressive-code`: Code syntax highlighting
- `astro-icon`: Icon components (MDI icons)
- `astro-robots-txt`: Robots.txt generation
- `astro-webmanifest`: Web manifest for PWA
- `rehype-external-links`: External links open in new tab with noopener/noreferrer
- `pagefind`: Client-side search

## Testing Changes

Before submitting a PR:

1. Build the site: `pnpm build`
2. Preview and review: `pnpm preview`
3. Check for type errors: `pnpm check`
4. Verify all links work
5. Ensure posts display correctly

## Common Tasks

### Adding a New Blog Post

1. Create file in `src/content/post/` with a descriptive filename
2. Add frontmatter with title, description, publishDate, and tags
3. Write content in Markdown
4. Test locally before committing

### Adding Images

1. Place images in `public/images/` directory
2. Reference in posts: `![Alt text](/images/image-name.png)`
3. Optimize images for web before committing

## Additional Notes

- Site URL: https://jonathanstrong.org
- Old Jekyll URLs redirect to new `/posts/` paths via `public/_redirects`
- Pagination and dark/light mode are built into the Cactus theme
