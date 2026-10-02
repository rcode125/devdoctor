# DevDoctor

DevDoctor is a cross-platform TypeScript developer-environment diagnostic tool available as a CLI and desktop app.

## MVP Features

- Shared check engine used by both CLI and desktop code.
- Checks for Node.js, Git, Python, Docker, and common local ports.
- Clear pass/warning/fail messages with suggested fixes.
- Local-only operation with no cloud account requirement.
- Local JSON storage in `~/.devdoctor/settings.json` and `~/.devdoctor/history.json`.

## CLI

Run all checks:

```bash
npm run check
```

## Testing

```bash
npm test
```
