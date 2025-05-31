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
    getTargetDirectory,
    getOutputDirectory,
    ProgressConfig
} from './src/helpers';
import { FileOperation } from './src/types';
import * as cliProgress from 'cli-progress';


// Main function
async function main(): Promise<void> {
    try {
        // Get target directory from user
        const targetDirectory = await getTargetDirectory();
        console.log(`\nScanning for audio files in: ${targetDirectory}`);

        // Get operation mode from user
        const operationMode = await promptForOperationMode();
        console.log(`\nOperation mode: ${operationMode === 'copy' ? 'Copy files (originals preserved)' : 'Move files (originals will be moved)'}`);

        // Get output directory from user
        const organizedDir = await getOutputDirectory();
        console.log(`\nOutput directory: ${organizedDir}`);

        // Find all audio files in the target directory
        const audioFiles = await findAudioFiles(targetDirectory);

        if (audioFiles.length === 0) {
            console.log('No audio files found.');
            return;
        } else {
            console.log(`Found ${audioFiles.length} audio files`);
        }

        // Create organized music directory
        const organizedDirCreated = await ensureDirectory(organizedDir);

        // Track all operations for potential revert
        const allOperations: FileOperation[] = [];
        const allCreatedDirectories: string[] = [...organizedDirCreated];

        // Create progress bar
        const progressBar = new cliProgress.SingleBar({
            format: 'Processing |{bar}| {percentage}% | {value}/{total} files | {filename}',
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true
        }, cliProgress.Presets.rect);

        // Disable verbose logging during progress bar
        ProgressConfig.setVerbose(false);

        // Start progress bar
        progressBar.start(audioFiles.length, 0, { filename: 'Starting...' });

        // Process each audio file
        for (let i = 0; i < audioFiles.length; i++) {
            const filePath = audioFiles[i];
            const fileName = filePath.split('/').pop() || filePath;

            // Update progress bar with current file
            progressBar.update(i, { filename: fileName.length > 40 ? '...' + fileName.slice(-37) : fileName });

            const fileInfo = await readAudioMetadata(filePath);
            if (fileInfo) {
                const result = await organizeFile(fileInfo, organizedDir, operationMode);
                if (result.operation) {
                    allOperations.push(result.operation);
                }
                allCreatedDirectories.push(...result.createdDirs);
            }
        }

        // Complete progress bar
        progressBar.update(audioFiles.length, { filename: 'Complete!' });
        progressBar.stop();

        // Re-enable verbose logging after progress bar
        ProgressConfig.setVerbose(true);

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
