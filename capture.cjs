const { execSync } = require('child_process');
const fs = require('fs');
try {
    execSync('npx vite build', { encoding: 'utf8' });
} catch (err) {
    fs.writeFileSync('error.txt', err.output ? err.output.join('\n') : err.message);
    fs.writeFileSync('stderr.txt', err.stderr || '');
    fs.writeFileSync('stdout.txt', err.stdout || '');
}
