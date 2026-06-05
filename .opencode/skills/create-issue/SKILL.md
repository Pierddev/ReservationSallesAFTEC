---
name: create-issue
description: >
    Use when the user asks to create a GitHub issue based on staged changes.
    Fully automated execution. Never suggests or creates branches/commits.
---

# Create GitHub Issue

The user wants to create a GitHub issue for changes that are staged but not yet committed. The agent must analyze the staged files and create the issue **fully automatically** — no questions, no prompts. The issue must be **short, precise, and directly derived from the diff context**.

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

2. **Auto-generate the issue body** — short and precise. No filler text, no greetings, no sign-offs. Fill only the template's **required** sections based on what the diff reveals. Skip optional sections.

    Follow this minimal structure depending on the type:
    - **Feature** → `Problem Statement` + `Proposed Solution` (1-2 sentences each). Priority: `Important`.
    - **Bug** → `Description` + `Steps to Reproduce` (from diff if traceable) + `Expected` vs `Actual`.
    - **Question** → `Question` only.
    - **Security** → `Description` + `Impact` + `Steps to Reproduce`.

3. **Create the issue** immediately using `gh` CLI — no confirmation:

```bash
   gh issue create \
     --title "[<Prefix>]: <title>" \
     --label "<label>" \
     --body "<body>"
```
