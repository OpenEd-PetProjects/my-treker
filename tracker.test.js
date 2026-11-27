const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');

function run(input) {
  const result = spawnSync(process.execPath, [path.join(__dirname, 'tracker.js')], {
    input,
    encoding: 'utf8',
    timeout: 5000,
  });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
}

test('shows both added habits in the list', () => {
  const output = run('1\nЧитать\n1\nЗарядка\n2\n0\n');
  assert.match(output, /1\. Читать\r?\n2\. Зарядка/);
});

test('starts with an empty list in a new process', () => {
  run('1\nЧитать\n0\n');
  const output = run('2\n0\n');
  assert.match(output, /Список привычек пуст/);
  assert.doesNotMatch(output, /Читать/);
});
