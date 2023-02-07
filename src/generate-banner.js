/**
 * Generates a JSDoc block comment, based on package.json data.
 *
 * @param   {string}  packageJson  Content of a package.json file
 * @param   {number}  [firstCommitYear]  Year of first commit (optional)
 * @param   {boolean}  [isNpm]  True if an npmjs.com package (defaults to false)
 * @returns {string}  Returns a JSDoc block comment
 */
export default function generateBanner(packageJson, firstCommitYear, isNpm) {
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
