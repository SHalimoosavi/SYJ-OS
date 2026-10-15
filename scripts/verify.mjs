import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import process from 'node:process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const npxCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx';

const steps = [
  {
    name: existsSync('package-lock.json') ? 'npm ci' : 'npm install',
    command: npmCommand,
    args: existsSync('package-lock.json') ? ['ci'] : ['install'],
  },
  { name: 'npm run icons', command: npmCommand, args: ['run', 'icons'] },
  { name: 'npm run typecheck', command: npmCommand, args: ['run', 'typecheck'] },
  { name: 'npm run lint', command: npmCommand, args: ['run', 'lint'] },
  { name: 'npm run test', command: npmCommand, args: ['run', 'test'] },
  { name: 'npm run build', command: npmCommand, args: ['run', 'build'] },
  { name: 'npx playwright install chromium', command: npxCommand, args: ['playwright', 'install', 'chromium'] },
  { name: 'npm run test:e2e', command: npmCommand, args: ['run', 'test:e2e'] },
];

function runStep(step) {
  console.log(`\n=== ${step.name} ===`);
  const result = spawnSync(step.command, step.args, {
    stdio: 'inherit',
    shell: false,
    env: process.env,
  });

  if (result.error) {
    console.error(`FAIL: ${step.name}`);
    console.error(result.error.stack ?? String(result.error));
    return false;
  }

  if (result.status !== 0) {
    console.error(`FAIL: ${step.name} (exit code ${result.status ?? 'unknown'})`);
    return false;
  }

  console.log(`PASS: ${step.name}`);
  return true;
}

let passed = true;
for (const step of steps) {
  if (!runStep(step)) {
    passed = false;
    break;
  }
}

console.log('\n=== Verification result ===');
console.log(passed ? 'PASS: all verification steps completed.' : 'FAIL: verification stopped at the first failing step.');
console.log('\nIf verification passed, the exact commands to commit the generated lockfile and push main are:');
console.log('git add package-lock.json');
console.log('git commit -m "Add generated package-lock.json"');
console.log('git push -u origin main');

process.exitCode = passed ? 0 : 1;
