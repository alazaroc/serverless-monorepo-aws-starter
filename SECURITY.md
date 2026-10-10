# Security Policy

## Reporting a vulnerability

If you discover a security vulnerability, please report it privately — **do not
open a public issue**.

Use GitHub's [private vulnerability reporting](https://github.com/alazaroc/serverless-monorepo-aws-starter/security/advisories/new)
(Security → Report a vulnerability), or contact the maintainer directly.

Please include:

- A description of the issue and its impact.
- Steps to reproduce or a proof of concept.
- Affected component (frontend, Lambda handler, CDK infra, auth flow, CI/CD).

You can expect an initial response within a few days. Once the issue is
confirmed and fixed, coordinated disclosure is welcome.

## Scope

This is an open-source **starter template**. There is no bug-bounty program, but
responsibly reported issues are genuinely appreciated and will be credited if
you'd like.

## Good to know

- Authentication uses **Cognito with mandatory TOTP MFA**; review the user pool
  and IAM configuration before going to production.
- CI/CD uses **GitHub Actions OIDC** — no long-lived AWS secrets are stored.
- CloudFront serves a private S3 bucket via OAC with security headers.
- When you build on top of this template, keep applying least privilege and
  review the generated IAM policies for your own domain.
