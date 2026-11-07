// Runs every test: node tests/run.js [folder of exported scans]
const {execFileSync} = require('child_process'), path = require('path');
for (const t of ['basic', 'noise', 'box', 'ground', 'roundtrip']){
  console.log('--- ' + t);
  process.stdout.write(execFileSync(process.execPath, [path.join(__dirname, t + '.js'), ...process.argv.slice(2)], {encoding: 'utf8'}));
}
