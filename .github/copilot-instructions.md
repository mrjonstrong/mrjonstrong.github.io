# GitHub Copilot Repository Instructions

This repository is a personal infosec blog built with Jekyll and hosted on GitHub Pages.

## Project Overview

- **Type**: Jekyll-based static site
- **Purpose**: Personal blog about information security
- **Deployment**: GitHub Pages
- **Theme**: Minima (dark skin)

## Build & Test Commands

### Local Development

```bash
# Install dependencies
bundle install

# Build the site
bundle exec jekyll build

# Serve the site locally with live reload
bundle exec jekyll serve --livereload

# Serve with drafts visible
bundle exec jekyll serve --drafts --livereload
```

### Linting

```bash
# The repository uses GitHub Super Linter which runs automatically on PRs
# Markdown linting uses configuration from .github/linters/.markdown-lint.yml
# JSCPD (copy-paste detection) uses .jscpd.json

# To validate markdown locally, ensure your changes follow the markdown-lint rules
```

## Code Style & Conventions

### Markdown Files

- Use consistent formatting following the markdown-lint rules in `.github/linters/.markdown-lint.yml`
- Blog posts go in `_posts/` directory with format: `YYYY-MM-DD-title.md`
- Drafts go in `_drafts/` directory
- Use front matter for all posts:
  ```yaml
  ---
  layout: post
  title: 'Your Title'
  date: YYYY-MM-DD
  ---
  ```

### YAML Configuration

- Maintain consistent indentation (2 spaces)
- Follow existing patterns in `_config.yml`
- Keep social links and author information up to date

### Directory Structure

- `_posts/`: Published blog posts
- `_drafts/`: Draft posts (not published)
- `_includes/`: Reusable HTML components
- `_layouts/`: Page layouts
- `_sass/`: Sass style sheets
- `_site/`: Generated site output (built by Jekyll)
- `assets/`: Images, CSS, and other static files

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
- Edit files in `_site/` directory (auto-generated)
- Change `.github/workflows/` files unless specifically requested
- Remove or disable security scanning tools (Trivy, StackHawk, Chainbench)

### DO:

- Follow security best practices in blog posts
- Keep dependencies up to date
- Review Dependabot alerts promptly
- Maintain code quality and security standards enforced by CI tools (Super Linter, Trivy, StackHawk, Chainbench)
- Ensure all external links use `target="_blank" rel="noopener noreferrer"` (handled by jekyll-target-blank plugin)

## Jekyll Plugins

The site uses the following Jekyll plugins:

- `jekyll-seo-tag`: SEO optimization
- `jekyll-paginate`: Post pagination (4 posts per page)
- `jekyll-sitemap`: Automatic sitemap generation
- `jekyll-feed`: RSS/Atom feed generation
- `jekyll-target-blank`: Secure external links

## Testing Changes

Before submitting a PR:

1. Build the site locally: `bundle exec jekyll build`
2. Serve and review: `bundle exec jekyll serve --livereload`
3. Check for build errors in output
4. Verify all links work
5. Review Markdown lint compliance
6. Ensure posts display correctly with pagination

## Common Tasks

### Adding a New Blog Post

1. Create file in `_posts/` with format: `YYYY-MM-DD-title.md`
2. Add front matter with title and date
3. Write content in Markdown
4. Test locally before committing

### Adding Images

1. Place images in `assets/` directory
2. Reference in posts: `![Alt text](/assets/image-name.png)`
3. Optimize images for web before committing

### Updating Configuration

- Site title, description: Edit `_config.yml`
- Social links: Update `social_links` in `_config.yml`
- Header pages: Modify `header_pages` in `_config.yml`

## Example Code Snippets

### Blog Post Front Matter

```yaml
---
layout: post
title: 'Understanding Buffer Overflows'
date: 2026-02-14
---
```

### Markdown Formatting

````markdown
# Main Heading

## Subheading

- Bulleted list
- Another item

**Bold text** and _italic text_

[Link text](https://example.com)

```bash
# Code block with syntax highlighting
echo "Hello World"
```
````

## Additional Notes

- Site timezone: Europe/London
- Pagination: 4 posts per page
- Permalink format: `/:title` (no date in URLs)
- Show drafts: Disabled by default (use `--drafts` flag to preview)