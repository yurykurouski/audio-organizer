import * as path from 'path';
import {
    readMp3Metadata,
    findMp3Files,
    ensureDirectory,
    organizeFile
} from './src/helpers';


// Main function
async function main(): Promise<void> {
    const currentDirectory = process.cwd();
    console.log(`Scanning for MP3 files in: ${currentDirectory}`);

    try {
        // Find all MP3 files
        const mp3Files = await findMp3Files(currentDirectory);

        if (mp3Files.length === 0) {
            console.log('No MP3 files found.');
            return;
        } else {
            console.log(`Found ${mp3Files.length} MP3 files`);
        }

        // Create organized music directory
        const organizedDir = path.join(currentDirectory, 'Organized_Music');
        await ensureDirectory(organizedDir);

        // Process each MP3 file
        for (const filePath of mp3Files) {
            console.log(`Processing: ${filePath}`);

            const fileInfo = await readMp3Metadata(filePath);
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
