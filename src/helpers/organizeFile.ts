import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';
import { FileInfo, FileOperation } from '../types';
import { ensureDirectory } from './ensureDirectory';
import { promptForFileConflictInteractive } from './interactivePrompts';
import { ProgressConfig } from './progressConfig';


const rename = promisify(fs.rename);
const copyFile = promisify(fs.copyFile);

// Organize file (copy or move) to organized structure and return operation info
export async function organizeFile(fileInfo: FileInfo, baseDirectory: string, operationMode: 'copy' | 'move' = 'move'): Promise<{ operation: FileOperation | null, createdDirs: string[] }> {
    const artistDir = path.join(baseDirectory, fileInfo.artist);
    const albumDir = path.join(artistDir, fileInfo.album);

    // Create artist and album directories
    const createdDirs = await ensureDirectory(albumDir);

    // Generate new filename with title if available
    const originalExt = path.extname(fileInfo.filePath);
    const newFileName = `${fileInfo.title}${originalExt}`;
    let newFilePath = path.join(albumDir, newFileName);

    try {
        // Check if destination file already exists
        if (fs.existsSync(newFilePath)) {
            const choice = await promptForFileConflictInteractive(newFilePath, fileInfo.filePath);

            switch (choice) {
                case 'keep':
                    if (ProgressConfig.isVerbose()) {
                        console.log(`Keeping existing file: ${newFilePath}`);
                        console.log(`Skipping: ${fileInfo.filePath}`);
                    }
                    return {
                        operation: null,
                        createdDirs
                    };

                case 'replace':
                    if (ProgressConfig.isVerbose()) {
                        console.log(`Replacing existing file: ${newFilePath}`);
                    }
                    // Remove the existing file first, then continue with the move operation
                    fs.unlink(newFilePath, () => {
                        if (ProgressConfig.isVerbose()) {
                            console.log(`Removed existing file: ${newFilePath}`);
                        }
                    });
                    // Continue with the move operation using the correct filename from metadata
                    break;

                case 'rename':
                    if (ProgressConfig.isVerbose()) {
                        console.log(`Renaming new file to avoid conflict...`);
                    }
                    // Find a unique name with number suffix
                    let counter = 1;
                    let uniqueFilePath = newFilePath;
                    while (fs.existsSync(uniqueFilePath)) {
                        const baseName = path.basename(newFileName, originalExt);
                        uniqueFilePath = path.join(albumDir, `${baseName}_${counter}${originalExt}`);
                        counter++;
                    }
                    newFilePath = uniqueFilePath;
                    if (ProgressConfig.isVerbose()) {
                        console.log(`New filename: ${path.basename(newFilePath)}`);
                    }
                    break;
            }
        }

        // Perform the file operation based on mode
        if (operationMode === 'copy') {
            await copyFile(fileInfo.filePath, newFilePath);
            if (ProgressConfig.isVerbose()) {
                console.log(`Copied: ${fileInfo.filePath} -> ${newFilePath}`);
            }
        } else {
            await rename(fileInfo.filePath, newFilePath);
            if (ProgressConfig.isVerbose()) {
                console.log(`Moved: ${fileInfo.filePath} -> ${newFilePath}`);
            }
        }

        // Return operation info for potential revert
        return {
            operation: {
                originalPath: fileInfo.filePath,
                newPath: newFilePath,
                operation: operationMode
            },
            createdDirs
        };
    } catch (error) {
        console.error(`Error ${operationMode === 'copy' ? 'copying' : 'moving'} file ${fileInfo.filePath}:`, error);
        return {
            operation: null,
            createdDirs
        };
    }
}
