# Stockpile Tally

Estimate gravel and rock stockpile volume and tonnage from tape measurements or an AR walk-around scan (Chrome on an ARCore Android phone).

Live: https://aaro668.github.io/stockpile-tally/

## Working on it

- `src/stockpile.html` is the source. Edit this, not `index.html`.
- `node tools/build.js` builds `index.html` (the page GitHub Pages serves) from the source and checks the script for syntax errors.
- `node tests/run.js [folder]` runs the volume tests. Pass a folder of exported scans (from the private stockpile-data repo's `scans/`) to also check that saved scans reopen with the same volume.
- `node tools/serve.js` serves the repo at http://localhost:8765 for testing in a browser. AR needs the real phone and the https site.
- `node tools/scan-summary.js <scan.json>` and `node tools/scan-grid.js <scan.json>` print what's in an exported scan: toe outline, volume, and a height grid.

Saved piles and scans are never stored in this repo. They live in the private stockpile-data repo, synced by the app with a token kept on each device.
