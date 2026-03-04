# jonathanstrong.org

Personal infosec blog built with [Astro](https://astro.build), deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Status

| | |
| --- | --- |
| Build | [![CI](https://github.com/mrjonstrong/website/actions/workflows/ci.yml/badge.svg)](https://github.com/mrjonstrong/website/actions/workflows/ci.yml) |
| Vulnerabilities | [![Trivy](https://github.com/mrjonstrong/website/actions/workflows/trivy.yml/badge.svg)](https://github.com/mrjonstrong/website/actions/workflows/trivy.yml) |
| Observatory | [![Mozilla Observatory](https://github.com/mrjonstrong/website/actions/workflows/observatory.yml/badge.svg)](https://github.com/mrjonstrong/website/actions/workflows/observatory.yml) [![grade](https://img.shields.io/mozilla-observatory/grade/jonathanstrong.org?publish=true&label=grade)](https://observatory.mozilla.org/analyze/jonathanstrong.org) |

## Security checks

Manual checks for the live site:

| Tool | What it checks |
| --- | --- |
| [Mozilla Observatory](https://observatory.mozilla.org/analyze/jonathanstrong.org) | HTTP security headers, CSP, cookies |
| [Security Headers](https://securityheaders.com/?q=https%3A%2F%2Fjonathanstrong.org%2F&hide=on) | Response header analysis |
| [SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=jonathanstrong.org&hideResults=on&latest) | TLS configuration and certificate |
