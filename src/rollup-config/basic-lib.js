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
 * @param   {string}  outputFile
 *     Name of the file to build, eg `"my-lib.js"`
 * @param   {string}  [banner]
 *     Text to start the build file (defaults to "")
 * @returns {object}
 *     Returns a Rollup configuration object
 */
export default function rollupConfigBasicLib(outputFile, banner = '') {

    // Validate the arguments.
    const ep = 'Error: rollupConfigBasicLib():'; // error prefix
    if (typeof outputFile !== 'string') throw Error(`${ep
        } outputFile is type '${typeof outputFile}' not 'string'`);
    if (typeof banner !== 'string') throw Error(`${ep
        } banner is type '${typeof banner}' not 'string'`);
    if (outputFile === '') throw Error(`${ep
        } outputFile is an empty string`);

    const output = {};
    if (banner !== '') output.banner = banner;
    output.file = outputFile;
    output.format = 'es';

    return {
        input: 'src/index.js',
        output,
   };
}
