import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Recursively find all audio files supported by iPod Classic in a directory
export async function findAudioFiles(directory: string): Promise<string[]> {
    const audioFiles: string[] = [];
    // All audio formats supported by iPod Classic
    const supportedExtensions = [
        '.mp3',     // MP3
        '.m4a',     // AAC, HE-AAC, Apple Lossless
        '.m4p',     // Protected AAC (iTunes Store)
        '.m4b',     // AAC audiobooks
        '.aac',     // AAC
        '.aiff',    // AIFF
        '.aif',     // AIFF (alternative extension)
        '.wav',     // WAV
        '.aa',      // Audible audiobooks
        '.aax'      // Audible audiobooks (enhanced)
    ];

    try {
        const items = await readdir(directory);

        for (const item of items) {
            const fullPath = path.join(directory, item);
            const stats = await stat(fullPath);

            if (stats.isDirectory()) {
                // Recursively search subdirectories
                const subFiles = await findAudioFiles(fullPath);
                audioFiles.push(...subFiles);
            } else if (stats.isFile() && supportedExtensions.includes(path.extname(item).toLowerCase())) {
                audioFiles.push(fullPath);
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${directory}:`, error);
    }

    return audioFiles;
}
