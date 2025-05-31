import * as fs from 'fs';
import { promisify } from 'util';
import { ProgressConfig } from './progressConfig';

const mkdir = promisify(fs.mkdir);

// Create directory if it doesn't exist, returns array of newly created directories
export async function ensureDirectory(dirPath: string): Promise<string[]> {
    const createdDirs: string[] = [];

    // Check which directories don't exist before creating them
    const pathsToCheck: string[] = [];
    let currentPath = dirPath;

    while (currentPath && currentPath !== '/' && !fs.existsSync(currentPath)) {
        pathsToCheck.unshift(currentPath);
        currentPath = require('path').dirname(currentPath);
    }

    try {
        if (pathsToCheck.length > 0) {
            await mkdir(dirPath, { recursive: true });
            createdDirs.push(...pathsToCheck);
            if (ProgressConfig.isVerbose()) {
                console.log(`Created directories: ${pathsToCheck.join(', ')}`);
            }
        }
        return createdDirs;
    } catch (error) {
        console.error(`Error creating directory ${dirPath}:`, error);
        return [];
    }
}
