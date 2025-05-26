import * as path from 'path';
import * as fs from 'fs';
import {
    readAudioMetadata,
    findAudioFiles,
    ensureDirectory,
    organizeFile,
    revertOperations,
    promptUser,
    promptForDirectory,
    promptForFileConflict,
    visualizeDirectoryStructure,
    generateOrganizationSummary
} from './src/helpers';
import { FileOperation } from './src/types';


// Function to get target directory from user
async function getTargetDirectory(): Promise<string> {
    console.log('\n=== Audio Files Organizer ===');
    console.log('Choose scanning option:');
    console.log('1. Scan current directory recursively');
    console.log('2. Scan for iPod music files in iPod_Control/Music folder');
    console.log('3. Enter custom target folder path');

    const choice = await promptForDirectory('Enter your choice (1/2/3): ');

    switch (choice.trim()) {
        case '1':
            return process.cwd();
        case '2':
            const currentDirectory = process.cwd();
            const iPodMusicDir = path.join(currentDirectory, 'iPod_Control', 'Music');

            if (!fs.existsSync(iPodMusicDir)) {
                console.error(`iPod_Control/Music directory not found at: ${iPodMusicDir}`);
                console.log('Please ensure this is an iPod directory with the iPod_Control folder.');
                process.exit(1);
            }
            return iPodMusicDir;
        case '3':
            const customPath = await promptForDirectory('Enter the full path to scan: ');
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

// Function to get operation mode from user
async function getOperationMode(): Promise<'copy' | 'move'> {
    console.log('\nChoose operation mode:');
    console.log('1. Copy files (original files remain in place)');
    console.log('2. Move files (original files will be moved)');

    const choice = await promptForDirectory('Enter your choice (1/2): ');

    switch (choice.trim()) {
        case '1':
            return 'copy';
        case '2':
            return 'move';
        default:
            console.log('Invalid choice. Using copy mode by default.');
            return 'copy';
    }
}

// Main function
async function main(): Promise<void> {
    try {
        // Get target directory from user
        const targetDirectory = await getTargetDirectory();
        console.log(`\nScanning for audio files in: ${targetDirectory}`);

        // Get operation mode from user
        const operationMode = await getOperationMode();
        console.log(`\nOperation mode: ${operationMode === 'copy' ? 'Copy files (originals preserved)' : 'Move files (originals will be moved)'}`);

        // Find all audio files in the target directory
        const audioFiles = await findAudioFiles(targetDirectory);

        if (audioFiles.length === 0) {
            console.log('No audio files found.');
            return;
        } else {
            console.log(`Found ${audioFiles.length} audio files`);
        }

        // Create organized music directory
        const organizedDir = path.join(process.cwd(), 'Organized_Music');
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

                const result = await organizeFile(fileInfo, organizedDir, operationMode);
                if (result.operation) {
                    allOperations.push(result.operation);
                }
                allCreatedDirectories.push(...result.createdDirs);
            }
        }

        console.log('\nOrganization complete!');
        console.log(`Files have been organized in: ${organizedDir}`);

        // Display organization summary and ASCII visualization
        if (allOperations.length > 0) {
            console.log(generateOrganizationSummary(allOperations));
            console.log(visualizeDirectoryStructure(organizedDir));
        }

        // Ask user if they want to revert changes
        const shouldRevert = await promptUser(`\nDo you want to revert all changes? ${operationMode === 'copy' ? '(copied files will be deleted)' : '(files will be moved back)'} (y/n): `);
        if (shouldRevert) {
            await revertOperations(allOperations, allCreatedDirectories);
        } else {
            console.log(`Changes kept. Files ${operationMode === 'copy' ? 'copied and' : ''} organized.`);
        }

    } catch (error) {
        console.error('Error during processing:', error);
    }
}

// Run the application
main().catch(console.error);
