// A saved AR scan keeps one point per surface cell. Check that rebuilding from that gives the same volume.
// Usage: node tests/roundtrip.js <folder of exported scan .json files>
const fs = require('fs'), path = require('path'), {scanVolume} = require('./geom.js');
const dir = process.argv[2]; if (!dir){ console.log('roundtrip: skipped (pass a folder of exported scans)'); process.exit(0); }
const mm = a => a.map(p => p.map(v => Math.round(v * 1000) / 1000));
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json'))){
  const s = JSON.parse(fs.readFileSync(path.join(dir, f))), r = scanVolume(s.base, s.surf), r2 = scanVolume(mm(s.base), mm(r.keep));
  console.log(f.padEnd(34), 'orig', r.vol.toFixed(3), 'reloaded', r2.vol.toFixed(3), 'saved size', JSON.stringify({base: mm(s.base), surf: mm(r.keep)}).length, 'bytes');
}
