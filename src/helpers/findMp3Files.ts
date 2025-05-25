import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Recursively find all MP3 files in a directory
export async function findMp3Files(directory: string): Promise<string[]> {
    const mp3Files: string[] = [];

    try {
        const items = await readdir(directory);

        for (const item of items) {
            const fullPath = path.join(directory, item);
            const stats = await stat(fullPath);

            if (stats.isDirectory()) {
                // Recursively search subdirectories
                const subFiles = await findMp3Files(fullPath);
                mp3Files.push(...subFiles);
            } else if (stats.isFile() && path.extname(item).toLowerCase() === '.mp3') {
                mp3Files.push(fullPath);
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${directory}:`, error);
    }

    return mp3Files;
}
