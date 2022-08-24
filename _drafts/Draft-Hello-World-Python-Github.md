---
title: Setting up a repo and pipeline in GitHub for a Python application
layout: post
author: jon
date: 2022-08-24
tags: cyber-security
published: false
---

# Setting up a repo and pipeline in GitHub for a Python application

## tl;dr

First post in a journey on creating an app around what to wear to run depepdning on the weather, type of run, the person etc
Starting off with a python cli app, plan is to move to a web app with flask, use AWS to host. Maybe then try some other langagues.
At the same time I wanted to bake security in, espically using GitHub workflows. The idea being to help those developing, espically on GitHub and Opensource.

At the end I need to add this all together into a summary/checklist etc, but for now I want to document as I go.

Goes without saying basic security hygine, keep OS/apps up to date, password manager, 2FA etc. Take a look at [this previous post](Password-Managers)

To that end check out some basics of securing your GitHub account.
[https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-strong-password](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-strong-password)

[https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication)

[https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification)

[https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule)

Specifics for securing your respositry:
[https://docs.github.com/en/code-security/getting-started/github-security-features](https://docs.github.com/en/code-security/getting-started/github-security-features)

This includes:

* Adding a security.md to let users know of supported version and how to communicate security vulnerabilities - issues aren't the best place as they are too public
* The dependency graph and dependabot alerts are already enabled. But you can enable Dependabot version updates
* Code scanning with CodeQL
* Secret scanning is enabled by default for public repos too

For this demo I'm using the repo [https://github.com/mrjonstrong/upgraded-disco](https://github.com/mrjonstrong/upgraded-disco) which is a hello world python app (for now).

Some repo basics (already added a security.md as above):

* [Readme](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)

* [License](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)

* [Sponsor button (Hey you never know!)](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/displaying-a-sponsor-button-in-your-repository)

* [Image for link previews](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/customizing-your-repositorys-social-media-preview)

* [Topics](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics)

* [Codeowners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)

* [Citation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-citation-files)

* [Actions](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository) - Here whilst the default setting is fairly good. You could change "Allowing select actions and reusable workflows to run". Allow GitHub actions and those in the Market Place from verified creators. There is also room to add specific actions you want to run to the list later on if need be.

I'm going to use [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow), just because I like the idea of the main branch being what is released in production and having a develop branch to add features and bug fixes too. Other Git workflows are available ;)

I mention this as it moves us on to how we can secure our branches in GitHub. With [branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches).

* Require a pull request before merging
  * Require approvals
  * Dismiss stale pull request approvals when new commits are pushed
  * Require review from Code Owners
  * ??Require status checks?>>
* Require signed commits
* Include administrators

You can set up Environments and protect them - [Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)

Whilst not security related, following best practices for open source projects - [recommended community standards](https://opensource.guide/).

The OSS Scorecard is worth following. They have an action you can add to help highlight improvements to make [https://github.com/ossf/scorecard](https://github.com/ossf/scorecard)

Use [harden runner](https://github.com/step-security/harden-runner) to secure workflows. [app.stepsecurity.io](app.stepsecurity.io)