/**
 * https://www.npmjs.com/package/build-helpers
 * @version 0.0.1
 * @license Copyright (c) 2023 0bdx <0@0bdx.com> (0bdx.com)
 * SPDX-License-Identifier: MIT
 */
/**
 * Generates a JSDoc block comment, based on package.json data.
 *
 * @param   {string}  packageJson  Content of a package.json file
 * @param   {number}  [firstCommitYear]  Year of first commit (optional)
 * @param   {boolean}  [isNpm]  True if an npmjs.com package (defaults to false)
 * @returns {string}  Returns a JSDoc block comment
 */
function generateBanner(packageJson, firstCommitYear, isNpm) {
    const { author, license, name, version } = JSON.parse(packageJson);
    const thisYear = new Date().getUTCFullYear();
    const yearRange = ! firstCommitYear || firstCommitYear === thisYear
        ? thisYear : `${firstCommitYear} - ${thisYear}`;
    return [
        '/**',
        ` * ${isNpm ? 'https://www.npmjs.com/package/' : ''}${name}`,
        ` * @version ${version}`,
        ` * @license Copyright (c) ${yearRange} ${author}`,
        ` * SPDX-License-Identifier: ${license}`,
        ' */',
    ].join('\n');
}

/**
 * Spawns a child process, to retrieve the year of the first commit from Git.
 *
 * @typedef {object}  Buffer  Result of calling `execSync()`
 * @param   {function (string): Buffer}  execSync  from Node.js 'child_process'
 * @returns {number}  Returns the year of the first Git commit
 */
function getFirstCommitYear(execSync) {
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

/**
 * Generates a Rollup config object, for building a simple JavaScript library.
 * 
 * ### Typical Usage:
 * 
 * In __rollup.config.js__:
 * ```js
 * import { rollupConfigBasicLib } from '0bdx/build-helpers';
 * const config = rollupConfigBasicLib('my-lib.js', '// my-lib');
 * export default config;
 * ```
 * In __package.json__:
 * ```json
 * {
 *     "scripts": {
 *         "build:prod": "rollup -c"
 *     }
 * }
 * ```
 * Run in your terminal:
 * ```sh
 * npm run build:prod
 * ```
 *
 * @param   {string}  outputFile  name of the file to build, eg `"my-lib.js"`
 * @param   {string}  [banner]  text to start the build file (defaults to "")
 * @returns {object}  Returns a Rollup configuration object
 */
function rollupConfigBasicLib(outputFile, banner = '') {
    return {
      input: 'src/index.js',
      output: {
         banner,
         file: outputFile,
         format: 'es',
      },
   };
}

export { generateBanner, getFirstCommitYear, rollupConfigBasicLib };
