/**
 * Spawns a child process, to retrieve the year of the first commit from Git.
 *
 * @typedef {object}  Buffer  Result of calling `execSync()`
 * @param   {function (string): Buffer}  execSync  from Node.js 'child_process'
 * @returns {number}  Returns the year of the first Git commit
 */
export default function getFirstCommitYear(execSync) {
    const fn = 'Warning: getFirstCommitYear():';
    try {
        const stdout = execSync('git log $(git rev-list --max-parents=0 HEAD)');
        if (stdout.error) return console.warn(fn, 'stdout error:', stdout.error);
        const matches = stdout.toString().match(/Date:\s*([^\n\r]+)/);
        if (matches === null) return console.warn(fn, 'Unexpected stdout:', stdout);
        const date = new Date(matches[1]);
        if (isNaN(date)) return console.warn(fn, 'Invalid date:', matches[1]);
        return date.getUTCFullYear();
    } catch (err) {
        return console.warn(fn, err.stderr.toString());
    }
}
 