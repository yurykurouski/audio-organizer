import * as path from 'path';
import {
    readAudioMetadata,
    findAudioFiles,
    ensureDirectory,
    organizeFile
} from './src/helpers';


// Main function
async function main(): Promise<void> {
    const currentDirectory = process.cwd();
    console.log(`Scanning for audio files in: ${currentDirectory}`);

    try {
        // Find all audio files
        const audioFiles = await findAudioFiles(currentDirectory);

        if (audioFiles.length === 0) {
            console.log('No audio files found.');
            return;
        } else {
            console.log(`Found ${audioFiles.length} audio files`);
        }

        // Create organized music directory
        const organizedDir = path.join(currentDirectory, 'Organized_Music');
        await ensureDirectory(organizedDir);

        // Process each audio file
        for (const filePath of audioFiles) {
            console.log(`Processing: ${filePath}`);

            const fileInfo = await readAudioMetadata(filePath);
            if (fileInfo) {
                console.log(`  Artist: ${fileInfo.artist}`);
                console.log(`  Album: ${fileInfo.album}`);
                console.log(`  Title: ${fileInfo.title}`);

                await organizeFile(fileInfo, organizedDir);
            }
        }

        console.log('\nOrganization complete!');
        console.log(`Files have been organized in: ${organizedDir}`);

    } catch (error) {
        console.error('Error during processing:', error);
    }
}

// Run the application
main().catch(console.error);
