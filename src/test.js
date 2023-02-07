import {
    generateBanner,
    getFirstCommitYear,
    // rollupConfigBasicLib
} from './index.js';

import generateBannerTest from './generate-banner.test.js';
import getFirstCommitYearTest from './get-first-commit-year.test.js';
// import rollupConfigBasicLibTest from './rollup-config/basic-lib.test.js';

generateBannerTest(generateBanner);
getFirstCommitYearTest(getFirstCommitYear);
// rollupConfigBasicLibTest(rollupConfigBasicLib);
