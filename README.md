# jonathanstrong.org

Personal infosec blog built with [Astro](https://astro.build), deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Status

| Item | Status |
| --- | --- |
| Build | [![CI](https://github.com/mrjonstrong/website/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/mrjonstrong/website/actions/workflows/ci.yml) |
| Vulnerabilities | [![Trivy](https://github.com/mrjonstrong/website/actions/workflows/trivy.yml/badge.svg?branch=main)](https://github.com/mrjonstrong/website/actions/workflows/trivy.yml) |
| Observatory | [![Mozilla Observatory](https://github.com/mrjonstrong/website/actions/workflows/observatory.yml/badge.svg?branch=main)](https://github.com/mrjonstrong/website/actions/workflows/observatory.yml) [![Mozilla Observatory grade](https://img.shields.io/mozilla-observatory/grade/jonathanstrong.org)](https://developer.mozilla.org/en-US/observatory/analyze?host=jonathanstrong.org) |
| Lighthouse | [![Performance](https://img.shields.io/pagespeed/performance/jonathanstrong.org?label=performance)](https://pagespeed.web.dev/report?url=https://jonathanstrong.org) [![Accessibility](https://img.shields.io/pagespeed/accessibility/jonathanstrong.org?label=accessibility)](https://pagespeed.web.dev/report?url=https://jonathanstrong.org) [![Best practices](https://img.shields.io/pagespeed/best-practices/jonathanstrong.org?label=best+practices)](https://pagespeed.web.dev/report?url=https://jonathanstrong.org) [![SEO](https://img.shields.io/pagespeed/seo/jonathanstrong.org?label=seo)](https://pagespeed.web.dev/report?url=https://jonathanstrong.org) |

## Security checks

Manual checks for the live site:

| Tool | What it checks |
| --- | --- |
| [Mozilla Observatory](https://developer.mozilla.org/en-US/observatory/analyze?host=jonathanstrong.org) | HTTP security headers, CSP, cookies |
| [Security Headers](https://securityheaders.com/?q=https%3A%2F%2Fjonathanstrong.org%2F&hide=on) | Response header analysis |
| [SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=jonathanstrong.org&hideResults=on&latest) | TLS configuration and certificate |
