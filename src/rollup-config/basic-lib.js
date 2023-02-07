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
export default function rollupConfigBasicLib(outputFile, banner = '') {
    return {
      input: 'src/index.js',
      output: {
         banner,
         file: outputFile,
         format: 'es',
      },
   };
}
