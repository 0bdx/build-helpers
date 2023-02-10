import equal from '../private-methods/equal.js';
import throws from '../private-methods/throws.js';

/**
 * rollupConfigBasicLib() unit tests
 * 
 * @param   {function}  f  rollupConfigBasicLib()
 * @return  {void}
 * @throws  Throws an `Error` if a test fails
 */
export default function rollupConfigBasicLibTest(f) {

    // Arguments are incorrect types.
    const ep = 'Error: rollupConfigBasicLib():'; // error prefix
    throws(()=>f(),
        `${ep} outputFile is type 'undefined' not 'string'`);
    throws(()=>f(''),
        `${ep} outputFile is an empty string`);
    throws(()=>f('ok.js', 123),
        `${ep} banner is type 'number' not 'string'`);

    // Banner is not set.
    equal(JSON.stringify(f('output-file', ''), null, 2),
`{
  "input": "src/index.js",
  "output": {
    "file": "output-file",
    "format": "es"
  }
}`);

    // Banner is set.
    equal(JSON.stringify(f('out-file.js', '/** The\n * banner. */'), null, 2),
`{
  "input": "src/index.js",
  "output": {
    "banner": "/** The\\n * banner. */",
    "file": "out-file.js",
    "format": "es"
  }
}`);

}
