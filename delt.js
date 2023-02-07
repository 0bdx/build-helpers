import { execSync } from 'child_process';

try {
    const stdout = execSync('git log $(git rev-list --max-parents=0 HEAD)');
    const matches = stdout.toString().match(/Date:\s*([^\n\r]+)/);
    console.log(matches);
    console.log(matches[1]);
    console.log('ok:', stdout.constructor.name);
    console.log(stdout.toString());
} catch (err) {
    console.log('nope:', err.constructor.name);
    console.log('err.message:', err.message);
}
