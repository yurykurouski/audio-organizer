import * as path from 'path';
import * as fs from 'fs';
import {
    readAudioMetadata,
    findAudioFiles,
    ensureDirectory,
    organizeFile,
    revertOperations,
    promptUser
} from './src/helpers';
import { FileOperation } from './src/types';


// Main function
async function main(): Promise<void> {
    const currentDirectory = process.cwd();
    const iPodMusicDir = path.join(currentDirectory, 'iPod_Control', 'Music');
    console.log(`Scanning for audio files in iPod folder: ${iPodMusicDir}`);

    try {
        // Check if iPod_Control/Music directory exists
        if (!fs.existsSync(iPodMusicDir)) {
            console.error(`iPod_Control/Music directory not found at: ${iPodMusicDir}`);
            console.log('Please ensure this is an iPod directory with the iPod_Control folder.');
            return;
        }

        // Find all audio files in iPod_Control/Music
        const audioFiles = await findAudioFiles(iPodMusicDir);

        if (audioFiles.length === 0) {
            console.log('No audio files found.');
            return;
        } else {
            console.log(`Found ${audioFiles.length} audio files`);
        }

        // Create organized music directory
        const organizedDir = path.join(currentDirectory, 'Organized_Music');
        const organizedDirCreated = await ensureDirectory(organizedDir);

        // Track all operations for potential revert
        const allOperations: FileOperation[] = [];
        const allCreatedDirectories: string[] = [...organizedDirCreated];

        // Process each audio file
        for (const filePath of audioFiles) {
            console.log(`Processing: ${filePath}`);

            const fileInfo = await readAudioMetadata(filePath);
            if (fileInfo) {
                console.log(`  Artist: ${fileInfo.artist}`);
                console.log(`  Album: ${fileInfo.album}`);
                console.log(`  Title: ${fileInfo.title}`);

                const result = await organizeFile(fileInfo, organizedDir);
                if (result.operation) {
                    allOperations.push(result.operation);
                }
                allCreatedDirectories.push(...result.createdDirs);
            }
        }

        console.log('\nOrganization complete!');
        console.log(`Files have been organized in: ${organizedDir}`);

        // Ask user if they want to revert changes
        const shouldRevert = await promptUser('\nDo you want to revert all changes? (y/n): ');
        if (shouldRevert) {
            await revertOperations(allOperations, allCreatedDirectories);
        } else {
            console.log('Changes kept. Files remain organized.');
        }

    } catch (error) {
        console.error('Error during processing:', error);
    }
}

// Run the application
main().catch(console.error);
