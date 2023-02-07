import equal from './private-methods/equal.js';
import throws from './private-methods/throws.js';

/**
 * generateBanner() unit tests
 * 
 * @param   {function}  f  generateBanner()
 * @return  {void}
 * @throws  Throws an `Error` if a test fails
 */
export default function generateBannerTest(f) {

    // Arguments are incorrect types.
    const ep = 'Error: generateBanner():'; // error prefix
    throws(()=>f(),
        `${ep} now is type 'undefined' not 'object'`);
    throws(()=>f({}),
        `${ep} packageJson is type 'undefined' not 'string'`);
    throws(()=>f({}, '', true),
        `${ep} firstCommitYear is type 'boolean' not 'number'`);
    throws(()=>f({}, '', 0, 0),
        `${ep} isNpm is type 'number' not 'boolean'`);
    throws(()=>f(new Array(), '', 0, true),
        `${ep} now is instance of 'Array' not 'Date'`);

    // The packageJson arguments is malformed.
    const y3k = new Date('3000/01/01');
    throws(()=>f(y3k, ''),
        `${ep} Cannot parse packageJson`);
    throws(()=>f(y3k, '{ "nope":nope }'),
        `${ep} Cannot parse packageJson`);
    throws(()=>f(y3k, '123'),
        `${ep} packageJson parses to 'number' not 'object'`);
    throws(()=>f(y3k, '{}'),
        `${ep} packageJson author is type 'undefined' not 'string'`);
    throws(()=>f(y3k, '{ "author":"", "license":false }'),
        `${ep} packageJson license is type 'boolean' not 'string'`);
    throws(()=>f(y3k, '{ "author":"", "license":"", "name":null }'),
        `${ep} packageJson name is type 'object' not 'string'`);
    throws(()=>f(y3k, '{ "author":"", "license":"", "name":"", "version":1 }'),
        `${ep} packageJson version is type 'number' not 'string'`);

    // All packageJson values empty strings.
    equal(f(y3k, '{ "author":"", "license":"", "name":"", "version":"" }'),
`/**
 * 
 * @version 
 * @license Copyright (c) 3000 
 * SPDX-License-Identifier: 
 */`
    );
    equal(f(y3k, '{ "author":"", "license":"", "name":"", "version":"" }',
        1234, true),
`/**
 * https://www.npmjs.com/package/
 * @version 
 * @license Copyright (c) 1234 - 3000 
 * SPDX-License-Identifier: 
 */`
    );

    // All packageJson values used.
    equal(f(y3k, '{ "author":"A", "license":"L", "name":"N", "version":"V" }'),
`/**
 * N
 * @version V
 * @license Copyright (c) 3000 A
 * SPDX-License-Identifier: L
 */`
    );
    equal(f(y3k, '{ "author":"A", "license":"L", "name":"N", "version":"V" }',
        3000, true), // same as y3k
`/**
 * https://www.npmjs.com/package/N
 * @version V
 * @license Copyright (c) 3000 A
 * SPDX-License-Identifier: L
 */`
    );

}
