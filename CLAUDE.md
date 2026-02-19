# CLAUDE

... (all other content remains unchanged) ...

## CI Workflows

| Workflow    | Trigger                  | Purpose                                                                 |
| ----------- | ------------------------ | ----------------------------------------------------------------------- |
| `ci.yml`    | push/PR to main, develop | Type check (`astro check`), lint (`biome check`, markdownlint), build   |
| `trivy.yml` | weekly + push/PR         | Filesystem vulnerability scanning                                       |

... (all other content remains unchanged) ...