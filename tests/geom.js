// Loads the geometry code (tape formulas, scan volume, sample scan) straight out of src/stockpile.html,
// so the tests always run against the real app code.
const fs = require('fs'), path = require('path');
const js = fs.readFileSync(path.join(__dirname, '..', 'src', 'stockpile.html'), 'utf8').split('<script>')[1].split('</script>')[0];
const cut = (a, b) => js.slice(js.indexOf(a), js.indexOf(b));
const code = 'const FT = 0.3048, YD3 = 0.764554858;\n' + cut('// ---------- geometry: tape', '// ---------- UI state') +
  cut('function sampleScan', "$('arDemo')") + '\nreturn {Tape, scanVolume, sampleScan};';
module.exports = new Function(code)();
