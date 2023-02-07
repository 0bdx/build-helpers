/**
 * https://www.npmjs.com/package/@0bdx/build-helpers
 * @version 0.0.1
 * @license Copyright (c) 2023 0bdx <0@0bdx.com> (0bdx.com)
 * SPDX-License-Identifier: MIT
 */
/**
 * Generates a JSDoc block comment, based on package.json data.
 * 
 * @example
 * generateBanner(
 *     new Date(),
 *     readFileSync('./package.json', 'utf-8'),
 *     2015, // better yet, use getFirstCommitYear() here
 *     true,
 * ),
 * // Depending on the current year and what's in package.json,
 * // returns a string like this: (☀ is * and ⓐ is an 'at' sign)
 * // /☀☀
 * //  ☀ https://www.npmjs.com/package/my-great-library
 * //  ☀ ⓐversion 1.2.3
 * //  ☀ ⓐlicense Copyright (c) 2015 - 2023 Kim Doe <kim@example.com>
 * //  ☀ SPDX-License-Identifier: MIT
 * //  ☀/
 * 
 * @param   {Date}     now
 *     A JavaScript Date instance, containing the current year
 * @param   {string}   packageJson
 *     Content of a package.json file
 * @param   {number}   [firstCommitYear]
 *     Year of first commit (optional)
 * @param   {boolean}  [isNpm]
 *     True if an npmjs.com package (defaults to false)
 * @returns {string}
 *     Returns a JSDoc block comment
 * @throws
 *     Throws an `Error` if arguments are invalid
 */
function generateBanner(
    now,
    packageJson,
    firstCommitYear = 0,
    isNpm = false,
) {

    // Validate the arguments.
    const ep = 'Error: generateBanner():'; // error prefix
    if (typeof now !== 'object') throw Error(`${ep
        } now is type '${typeof now}' not 'object'`);
    if (typeof packageJson !== 'string') throw Error(`${ep
        } packageJson is type '${typeof packageJson}' not 'string'`);
    if (typeof firstCommitYear !== 'number') throw Error(`${ep
        } firstCommitYear is type '${typeof firstCommitYear}' not 'number'`);
    if (typeof isNpm !== 'boolean') throw Error(`${ep
        } isNpm is type '${typeof isNpm}' not 'boolean'`);
    if (! (now instanceof Date)) throw Error(`${ep
        } now is instance of '${now['constructor']['name']}' not 'Date'`);

    // Parse the packageJson string to an object, validate and destructure it.
    // @TODO use a validation library
    let packageObj;
    try { packageObj = JSON.parse(packageJson); } catch(err) {
        throw Error(`${ep} Cannot parse packageJson`) }
    if (typeof packageObj !== 'object') throw Error(`${ep
        } packageJson parses to '${typeof packageObj}' not 'object'`);
    const { author, license, name, version } = packageObj;
    if (typeof author !== 'string') throw Error(`${ep
    } packageJson author is type '${typeof author}' not 'string'`);
    if (typeof license !== 'string') throw Error(`${ep
    } packageJson license is type '${typeof license}' not 'string'`);
    if (typeof name !== 'string') throw Error(`${ep
    } packageJson name is type '${typeof name}' not 'string'`);
    if (typeof version !== 'string') throw Error(`${ep
    } packageJson version is type '${typeof version}' not 'string'`);

    // If firstCommitYear was not supplied, or if firstCommitYear is the same as
    // this year, then yearRange is just this year. Otherwise, yearRange is an
    // actual range, eg '2015 - 2023'.
    const thisYear = now.getUTCFullYear();
    const yearRange = (! firstCommitYear || firstCommitYear === thisYear)
        ? thisYear
        : `${firstCommitYear} - ${thisYear}`;

    // Assemble the values into JSDoc block comment.
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
 * Retrieves the year of the first commit from `git`, using a child process.
 * 
 * This function is fault-tolerant by default, to keep build-pipelines running
 * smoothly. If its child process fails for any reason, it returns the number 0.
 * That means, if you are passing the result into `generateBanner()`, the
 * banner will just show the current year, not a 'from - to' range.
 *
 * @typedef {import('node:child_process').execSync} ExecSyncSignature
 * 
 * @param   {ExecSyncSignature}  execSync
 *     Synchronously spawns a shell and executes a command;
 *     Typically `import { execSync } from 'child_process'`, in Node.js
 * @param   {boolean}  isFaultTolerant
 *     If `false`, any error is thrown as an exception (default is `true`)
 * @returns {number}
 *     Returns the year of the first Git commit;
 *     Returns zero if `suppressErrors` is `true` and an error occurred
 * @throws
 *     Throws an `Error` if `suppressErrors` is `false` and an error occurred;
 *     Also throws an `Error` if either argument is invalid.
 */
function getFirstCommitYear(
    execSync,
    isFaultTolerant = true,
) {
    // Validate the arguments. An invalid argument always throws an error,
    // even if `isFaultTolerant` is true.
    const ep = 'Error: getFirstCommitYear():'; // error prefix
    if (typeof execSync !== 'function') throw Error(`${ep
        } execSync is type '${typeof execSync}' not 'function'`);
    if (typeof isFaultTolerant !== 'boolean') throw Error(`${ep
        } isFaultTolerant is type '${typeof isFaultTolerant}' not 'boolean'`);

    try {

        // Try to get the first commit (assumes pwd is in a Git repo).
        const stdout = execSync('git log $(git rev-list --max-parents=0 HEAD)');

        // Convert "commit 45650 ... Date:   Tue Feb 7 21:31:04 2023 +0000 ..."
        // to an array where index 1 is "Tue Feb 7 21:31:04 2023 +0000".
        const matches = stdout.toString().match(/Date:\s*([^\n\r]+)/);
        if (matches === null) throw Error(`stdout doesn't contain 'Date: ...'`);

        // Parse the "Tue Feb 7 21:31:04 2023 +0000" string to a Date instance.
        const date = new Date(matches[1]);
        if (isNaN(date.valueOf())) throw Error(`stdout 'Date: ...' is invalid`);

        // Return the four-digit year part of the Date instance.
        return date.getUTCFullYear();

    } catch (err) {
        // By default, getFirstCommitYear() suppresses any error, and returns
        // a zero instead. See JSDoc description for the rationale.
        if (isFaultTolerant) return 0;

        // If `isFaultTolerant` was set to `false`, propagate the error.
        throw Error(`${ep} ${err.message}`)
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
