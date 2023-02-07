import {
    generateBanner,
    getFirstCommitYear,
    // rollupConfigBasicLib
} from './build-helpers.js';

import generateBannerTest from './src/generate-banner.test.js';
import getFirstCommitYearTest from './src/get-first-commit-year.test.js';
// import rollupConfigBasicLibTest from './src/rollup-config/basic-lib.test.js';

generateBannerTest(generateBanner);
getFirstCommitYearTest(getFirstCommitYear);
// rollupConfigBasicLibTest(rollupConfigBasicLib);
