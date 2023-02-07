/// <reference types="node" />
/**
 * Retrieves the year of the first commit from `git`, using a child process.
 *
 * This function is fault-tolerant by default, to keep build-pipelines running
 * smoothly. If its child process fails for any reason, it returns the number 0.
 * That means, if you are passing the result into `generateBanner()`, the
 * banner will just show the current year, not a 'from - to' range.
 */
export type ExecSyncSignature = typeof import("child_process").execSync;
/**
 * https://www.npmjs.com/package/build-helpers
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
export function generateBanner(now: Date, packageJson: string, firstCommitYear?: number, isNpm?: boolean): string;
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
export function getFirstCommitYear(execSync: ExecSyncSignature, isFaultTolerant?: boolean): number;
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
export function rollupConfigBasicLib(outputFile: string, banner?: string): object;
