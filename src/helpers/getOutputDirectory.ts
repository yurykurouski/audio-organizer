import * as path from 'path';
import * as fs from 'fs';

import { promptForCustomOutputPath, promptForOutputDirectory } from "./interactivePrompts";


// Function to get output directory from user
export async function getOutputDirectory(): Promise<string> {
    const choice = await promptForOutputDirectory();

    switch (choice) {
        case 'default':
            return path.join(process.cwd(), 'Organized_Music');
        case 'custom':
            const customPath = await promptForCustomOutputPath();

            // Check if the parent directory exists (the output directory itself doesn't need to exist yet)
            const parentDir = path.dirname(customPath);
            if (!fs.existsSync(parentDir)) {
                console.error(`Parent directory not found: ${parentDir}`);
                console.log('Please ensure the parent directory exists.');
                process.exit(1);
            }

            return customPath;
        default:
            console.log('Invalid choice. Using default directory.');
            return path.join(process.cwd(), 'Organized_Music');
    }
}
