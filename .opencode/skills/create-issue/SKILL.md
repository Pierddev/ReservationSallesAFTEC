---
name: create-issue
description: >
    Use when the user asks to create a GitHub issue based on staged changes.
    Shows the issue to the user before creating. Never suggests or creates branches/commits.
---

# Create GitHub Issue

The user wants to create a GitHub issue for changes that are staged but not yet committed. The issue must be **short, precise, in English, and directly derived from the diff context**.

## Workflow

0. **Analyze staged changes** — Run these commands to understand the context:
    - `git diff --cached --name-only` — list modified files
    - `git diff --cached` — inspect the actual changes

    Use the file paths and diff content to infer:
    - **Scope**: which part of the project is affected (`backend`, `frontend`, etc.)
    - **Type**: `feat`, `fix`, `chore`, or security-related
    - **Title**: a meaningful, short summary of the change
    - **Body**: concise description of what the changes do

1. **Auto-detect issue type** from the staged changes — do NOT ask the user:
    - Changes with `fix:` or bug-related keywords → **bug** (`bug.yml`, label: `bug`)
    - Changes with `feat:` or new functionality → **feature** (`feature.yml`, label: `enhancement`)
    - Changes with security keywords → **security** (`security.yml`, label: `security`)
    - Otherwise → default to **feature** (`feature.yml`, label: `enhancement`)

2. **Auto-generate the issue body** — short, precise, in English. No filler text, no greetings, no sign-offs.

    Read the local issue template at `./.github/ISSUE_TEMPLATE/<type>.yml` (where `<type>` is `feature`, `bug`, or `security` as detected above).
    Fill only the **required** sections based on what the diff reveals. Skip optional sections.
    For **feature**: fill `Problem Statement` (1-2 sentences), `Proposed Solution` (1-2 sentences), and set `Priority: Important`.

3. **Present the issue** to the user — show the title, label, and full body. Wait for the user's approval before creating.

4. **Create the issue** on approval using `gh` CLI:

```bash
   gh issue create \
     --title "[<Prefix>]: <title>" \
     --label "<label>" \
     --body "<body>"
```
