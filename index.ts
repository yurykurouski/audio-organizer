import * as path from 'path';
import {
    readAudioMetadata,
    findAudioFiles,
    ensureDirectory,
    organizeFile,
    revertOperations,
    promptForOperationMode,
    promptForConfirmation,
    visualizeDirectoryStructure,
    generateOrganizationSummary,
    getTargetDirectory
} from './src/helpers';
import { FileOperation } from './src/types';


// Main function
async function main(): Promise<void> {
    try {
        // Get target directory from user
        const targetDirectory = await getTargetDirectory();
        console.log(`\nScanning for audio files in: ${targetDirectory}`);

        // Get operation mode from user
        const operationMode = await promptForOperationMode();
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
        const shouldRevert = await promptForConfirmation(`Do you want to revert all changes? ${operationMode === 'copy' ? '(copied files will be deleted)' : '(files will be moved back)'}`);
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
