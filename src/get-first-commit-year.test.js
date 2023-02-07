import equal from './private-methods/equal.js';
import throws from './private-methods/throws.js';

/**
 * getFirstCommitYear() unit tests
 * 
 * @param   {function}  f  getFirstCommitYear()
 * @return  {void}
 * @throws  Throws an `Error` if a test fails
 */
export default function getFirstCommitYearTest(f) {

    // Arguments are incorrect types.
    const ep = 'Error: getFirstCommitYear():'; // error prefix
    throws(()=>f(),
        `${ep} execSync is type 'undefined' not 'function'`);
    throws(()=>f(()=>1, ''),
        `${ep} isFaultTolerant is type 'string' not 'boolean'`);

    // `execSync()` throws an Error.
    const mockExecSync1 = () => { throw Error('Oops!') };
    equal(f(mockExecSync1, true),
        0);
    throws(()=>f(mockExecSync1, false),
        `${ep} Oops!`);
    equal(f(mockExecSync1),
        0);

    // `execSync()` returns a string containing "date: " not "Date: ".
    const mockExecSync2 = () =>
        'commit 456...\n'+
        'Author: ...\n'+
        'date:   Tue Feb 7 21:31:04 2023 +0000\n'+
        '\n'+
        '    Initial commit\n';
    equal(f(mockExecSync2),
        0);
    throws(()=>f(mockExecSync2, false),
        `${ep} stdout doesn't contain 'Date: ...'`);
    equal(f(mockExecSync2, true),
        0);

    // `execSync()` returns a string where "Date: ..." contains "Feb 32".
    const mockExecSync3 = () =>
        'commit 456...\n'+
        'Author: ...\n'+
        'Date:   Tue Feb 32 21:31:04 2023 +0000\n'+
        '\n'+
        '    Initial commit\n';
    equal(f(mockExecSync3, true),
        0);
    throws(()=>f(mockExecSync3, false),
        `${ep} stdout 'Date: ...' is invalid`);
    equal(f(mockExecSync3),
        0);

    // `execSync()` returns a string where "Date: ..." contains a valid date.
    const mockExecSync4 = () =>
        'commit 456...\n'+
        'Author: ...\n'+
        'Date:   Tue Feb 7 21:31:04 2023 +0000\n'+
        '\n'+
        '    Initial commit\n';
    equal(f(mockExecSync4, true),
        2023);
    equal(f(mockExecSync4),
        2023);
    equal(f(mockExecSync4, false),
        2023);
}
