/**
 * Result of calling `execSync()`
 */
export type Buffer = object;
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
export function generateBanner(packageJson: string, firstCommitYear?: number, isNpm?: boolean): string;
/**
 * Spawns a child process, to retrieve the year of the first commit from Git.
 *
 * @typedef {object}  Buffer  Result of calling `execSync()`
 * @param   {function (string): Buffer}  execSync  from Node.js 'child_process'
 * @returns {number}  Returns the year of the first Git commit
 */
export function getFirstCommitYear(execSync: (arg0: string) => Buffer): number;
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
