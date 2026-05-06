# Visual XSL Code Interface

This workspace is intentionally separate from the other sandbox XSL projects.

## Live Viewer

After the GitHub repo is published, the public viewer will be available at:

```text
https://resource-sharing-librarian.github.io/visual-xsl-code-interface/
```

## Guardrails

- Do not import code or assets from `xsl-builder-prototype`.
- Do not import code or assets from `xsl-builder-prototype-live-site`.
- Treat this as an alternate implementation and design track.
- Keep all source files, experiments, and notes inside this folder.

## Prototype Included

This folder includes a standalone visual Alma letter builder:

- `index.html`: application shell
- `styles.css`: layout and editor styling
- `app.js`: toolbar behavior, token insertion, XSL assembly, and preview rendering
- `letters/ful-incoming-slip-letter/`: Ful Incoming Slip XML samples and wrapper XSL assets

## How To Run

Serve this folder from a local web server, then open `index.html`.

Recommended on this machine:

```bash
powershell -ExecutionPolicy Bypass -File .\sandbox\resource-sharing-letters-alt\start-server.ps1
```

Then open:

```text
http://localhost:8000/sandbox/resource-sharing-letters-alt/
```

If the server starts correctly, the terminal will print:

```text
Visual Alma Letter Builder server running.
Open http://localhost:8000/sandbox/resource-sharing-letters-alt/
```

Opening `index.html` directly with a `file://` URL may block loading the letter asset files.

## Current Scope

The current prototype demonstrates:

- one required letter selection starting with `Ful Incoming Slip Letter`
- visual editor surface
- toolbar formatting controls
- click-to-insert metadata, barcode, and Alma label tokens
- generated middle-content XSL assembly
- preview rendering from sample XML

## Next Good Steps

- move the hard-coded token registry into per-letter config files
- add more Alma letters
- replace `prompt()` table entry with a visual table picker
- add copy/download actions
- add structured `if` / `choose` logic blocks later
