# CLAUDE.md — AI Assistant Guide for visionboard

This file provides context and conventions for AI assistants (Claude, Copilot, etc.) working in this repository. Update it as the project evolves.

## Project Overview

**visionboard** is a project currently in its initial setup phase. This file should be updated with a description of the project's purpose, target users, and core functionality once development begins.

## Repository State

This repository was initialized with a single README.md. All scaffolding, tooling, and source code is yet to be added.

## Development Setup

> Update this section once a technology stack is chosen.

Currently there are no dependencies, build tools, or environment requirements. Expected additions:

- Package manager and dependency manifest (e.g., `package.json`, `pyproject.toml`)
- Runtime/language version (add `.nvmrc`, `.python-version`, or equivalent)
- Environment variable template (`.env.example`)
- Local dev server command

## Directory Structure

> Update this section as directories are created.

```
visionboard/
├── CLAUDE.md       # This file
└── README.md       # Project description (currently placeholder)
```

## Git Workflow

- Default branch: `master`
- Feature branches: use descriptive names (e.g., `feat/user-auth`, `fix/login-bug`)
- Commit message style: imperative mood, present tense (e.g., "Add login form", not "Added login form")
- Keep commits focused — one logical change per commit
- Do not commit secrets, credentials, or `.env` files

## Code Conventions

> Update this section once a language and framework are selected.

Until the stack is established, the following general principles apply:

- Prefer clarity over cleverness
- Keep functions small and single-purpose
- Avoid premature abstraction — three similar lines is better than a wrong abstraction
- Delete unused code rather than commenting it out
- No trailing whitespace; files should end with a newline

## Testing

> Update this section once a test framework is configured.

- Write tests for new features and bug fixes
- Tests live alongside or near the code they test
- All tests must pass before merging

## Environment Variables

> Update this section with required environment variables once configured.

No environment variables are required yet. When they are needed:
- Document each variable in `.env.example` with a comment explaining its purpose
- Never commit actual secret values
- Provide safe defaults for local development where possible

## AI Assistant Notes

- This repository is in early stages — check whether files exist before attempting to edit them
- When adding the first files, consider the overall project structure and establish clear conventions from the start
- Update this CLAUDE.md whenever significant architectural decisions are made or new tooling is added
- Prefer editing existing files over creating new ones unless a new module is clearly warranted
- Do not add unnecessary comments, docstrings, or type annotations to code that was not changed
