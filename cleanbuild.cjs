const { execSync } = require('child_process');
try {
    execSync('npx vite build', { stdio: 'pipe' });
} catch (err) {
    console.log('STDOUT:', err.stdout.toString().replace(/\x1B\[\d+m/g, ''));
    console.log('STDERR:', err.stderr.toString().replace(/\x1B\[\d+m/g, ''));
}
