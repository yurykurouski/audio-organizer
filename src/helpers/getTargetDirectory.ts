import * as path from 'path';
import * as fs from 'fs';

import { promptForCustomPath, promptForTargetDirectory } from "./interactivePrompts";


// Function to get target directory from user
export async function getTargetDirectory(): Promise<string> {
    console.log('\n=== Audio Files Organizer ===');

    const choice = await promptForTargetDirectory();

    switch (choice) {
        case 'current':
            return process.cwd();
        case 'ipod':
            const currentDirectory = process.cwd();
            const iPodMusicDir = path.join(currentDirectory, 'iPod_Control', 'Music');

            if (!fs.existsSync(iPodMusicDir)) {
                console.error(`iPod_Control/Music directory not found at: ${iPodMusicDir}`);
                console.log('Please ensure this is an iPod directory with the iPod_Control folder.');
                process.exit(1);
            }
            return iPodMusicDir;
        case 'custom':
            const customPath = await promptForCustomPath();
            if (!fs.existsSync(customPath)) {
                console.error(`Directory not found: ${customPath}`);
                process.exit(1);
            }
            return customPath;
        default:
            console.log('Invalid choice. Scanning current directory by default.');
            return process.cwd();
    }
}