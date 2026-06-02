---
name: create-issue
description: >
  Use when the user asks to create a GitHub issue. Also suggests branch
  name and commit message. Use ONLY for creating issues — never create
  branches or commits.
---

# Create GitHub Issue

The user wants to create a GitHub issue using one of the templates in `.github/ISSUE_TEMPLATE/`.

## Workflow

1. **Ask which type of issue** — present these 4 options:
   - **Feature** (`feature.yml` — label: `enhancement`)
   - **Bug** (`bug.yml` — label: `bug`)
   - **Question** (`question.yml` — label: `question`)
   - **Security** (`security.yml` — label: `security`)

2. **Prompt the user** for each required field of the chosen template. Ask in the user's language, but **all content sent to GitHub must be in English**.

3. **Create the issue** using the `gh` CLI:
   ```
   gh issue create \
     --title "<title>" \
     --label "<label>" \
     --body "<body>"
   ```

   Format the body as Markdown with the template's section headings (e.g. `### 🎯 Problem Statement`, `### 💡 Proposed Solution`, etc.).

4. **Return the issue URL** to the user.

5. **Suggest a branch name and commit message** following the repo's conventions (based on `git log`):
   - **Branch**: `<type>/<short-description>` (e.g. `feature/auth-service`, `fix/relations-type-error`)
   - **Commit**: `<type>(<scope>): <description>` (e.g. `feat(backend): add auth service with register and login`, `fix(backend): fix TypeORM relations type error`)
   - Types and scopes should match the existing pattern: `feat`, `fix`, `chore` for types; `backend`, `entities`, etc. for scopes.

## Rules

- **NEVER** create a branch or commit. Only create the issue and suggest the names.
- Everything written to GitHub (title, body, labels) must be in **English**.
- Use the exact label matching the template (`enhancement`, `bug`, `question`, `security`).
- The issue title should follow the template prefix convention: `[Feature]: ...`, `[Bug]: ...`, `[Question]: ...`, `[Security]: ...`
