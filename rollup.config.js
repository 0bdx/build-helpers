import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import {
    generateBanner,
    getFirstCommitYear,
    rollupConfigBasicLib
} from './src/index.js';

export default rollupConfigBasicLib(
    'build-helpers.js',
    generateBanner(
        new Date(),
        readFileSync('./package.json', 'utf-8'),
        getFirstCommitYear(execSync),
        true,
    ),
);
