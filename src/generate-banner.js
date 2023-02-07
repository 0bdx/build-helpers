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
export default function generateBanner(
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
    try { packageObj = JSON.parse(packageJson) } catch(err) {
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
