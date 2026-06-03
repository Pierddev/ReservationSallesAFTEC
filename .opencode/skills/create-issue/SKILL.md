---
name: create-issue
description: >
  Use when the user asks to create a GitHub issue. Also suggests branch
  name and commit message. Use ONLY for creating issues — never create
  branches or commits.
---

# Create GitHub Issue

The user wants to create a GitHub issue for changes that are staged but not yet committed. The agent must analyze the staged files and create the issue **fully automatically** — no questions, no prompts. The issue must be **short, precise, and directly derived from the diff context**.

## Workflow

0. **Analyze staged changes** — Run these commands to understand the context:
   - `git diff --cached --name-only` — list modified files
   - `git diff --cached` — inspect the actual changes
   - `git log --oneline -10` — understand repo conventions (prefixes, scopes)

   Use the file paths and diff content to infer:
   - **Scope**: which part of the project is affected (`backend`, `frontend`, `entities`, etc.)
   - **Type**: `feat`, `fix`, `chore`, or security-related
   - **Title**: a meaningful, short summary of the change
   - **Body**: concise description of what the changes do

1. **Auto-detect issue type** from the staged changes — do NOT ask the user:
   - Changes with `fix:` or bug-related keywords → **bug** (`bug.yml`, label: `bug`)
   - Changes with `feat:` or new functionality → **feature** (`feature.yml`, label: `enhancement`)
   - Changes with security keywords → **security** (`security.yml`, label: `security`)
   - Otherwise → default to **feature** (`feature.yml`, label: `enhancement`)

2. **Auto-generate the issue body** — short and precise. No filler text, no greetings, no sign-offs. Fill only the template's **required** sections based on what the diff reveals. Skip optional sections unless the content strongly suggests otherwise.

   Follow this minimal structure depending on the type:
   - **Feature** → `Problem Statement` + `Proposed Solution` (1-2 sentences each). Priority: `Important`.
   - **Bug** → `Description` + `Steps to Reproduce` (from diff if traceable) + `Expected` vs `Actual`.
   - **Question** → `Question` only (rare; only if diff suggests a question/inquiry).
   - **Security** → `Description` + `Impact` + `Steps to Reproduce`.

3. **Create the issue** immediately using `gh` CLI — no confirmation:
   ```
   gh issue create \
     --title "[<Prefix>]: <title>" \
     --label "<label>" \
     --body "<body>"
   ```

   Prefixes: `[Feature]`, `[Bug]`, `[Question]`, `[Security]`.

4. **Return the issue URL** to the user.

5. **Suggest a branch name and commit message** based on the staged files analyzed in step 0, following the repo's conventions:
   - **Branch**: `<type>/<short-description>` (e.g. `feature/auth-service`, `fix/relations-type-error`)
   - **Commit**: `<type>(<scope>): <description>` (e.g. `feat(backend): add auth service with register and login`, `fix(backend): fix TypeORM relations type error`)
   - Types and scopes should match the existing pattern and be inferred from the staged files.
   - **Avoid `Co-authored-by`**: When making the commit, ensure the author email matches the user's GitHub noreply email (`139257364+Pierddev@users.noreply.github.com`). Use `git commit --author="Pierddev <139257364+Pierddev@users.noreply.github.com>"` if needed.

## Rules

- **NEVER** create a branch or commit. Only create the issue and suggest the names.
- The issue **must** be based on the staged files (step 0) — never create an issue without analyzing `git diff --cached` first.
- **No user prompts** — the agent must decide everything autonomously from the diff context.
- **Short and precise** — no greetings, no sign-offs, no fluff. Every sentence must carry information.
- Everything written to GitHub (title, body, labels) must be in **English**.
- Use the exact label matching the template (`enhancement`, `bug`, `question`, `security`).
- The issue title must use the template prefix convention: `[Feature]: ...`, `[Bug]: ...`, `[Question]: ...`, `[Security]: ...`
- Skip optional template fields unless the diff explicitly provides the information.
