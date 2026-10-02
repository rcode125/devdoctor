# DevDoctor

DevDoctor is a cross-platform TypeScript developer-environment diagnostic tool available as a CLI and desktop app. It detects common local development problems and provides clear, actionable fixes.

## Features

- Shared check engine used by both the CLI and desktop app.
- Checks for Node.js, Git, Python, Docker, and common local ports.
- Clear pass, warning, and failure messages with suggested fixes.
- Local-only operation with no cloud account required.
- Local JSON storage for settings and diagnostic history:
  - `~/.devdoctor/settings.json`
  - `~/.devdoctor/history.json`

## CLI

Run all environment checks:

```bash
npm run check
```

## Testing

Run the test suite with:

```bash
npm test
```
