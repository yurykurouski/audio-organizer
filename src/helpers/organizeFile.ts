import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';
import { FileInfo } from '../types';
import { ensureDirectory } from './ensureDirectory';


const rename = promisify(fs.rename);

// Move file to organized structure
export async function organizeFile(fileInfo: FileInfo, baseDirectory: string): Promise<void> {
    const artistDir = path.join(baseDirectory, fileInfo.artist);
    const albumDir = path.join(artistDir, fileInfo.album);

    // Create artist and album directories
    await ensureDirectory(albumDir);

    // Generate new filename with title if available
    const originalExt = path.extname(fileInfo.filePath);
    const newFileName = `${fileInfo.title}${originalExt}`;
    let newFilePath = path.join(albumDir, newFileName);

    try {
        // Check if destination file already exists
        if (fs.existsSync(newFilePath)) {
            console.log(`File already exists: ${newFilePath}`);
            // If file exists, add a number suffix
            let counter = 1;
            let uniqueFilePath = newFilePath;
            while (fs.existsSync(uniqueFilePath)) {
                const baseName = path.basename(newFileName, originalExt);
                uniqueFilePath = path.join(albumDir, `${baseName}_${counter}${originalExt}`);
                counter++;
            }
            newFilePath = uniqueFilePath;
        }

        await rename(fileInfo.filePath, newFilePath);
        console.log(`Moved: ${fileInfo.filePath} -> ${newFilePath}`);
    } catch (error) {
        console.error(`Error moving file ${fileInfo.filePath}:`, error);
    }
}
