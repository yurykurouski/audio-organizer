import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { FileOperation } from '../types';

const rename = promisify(fs.rename);
const rmdir = promisify(fs.rmdir);
const readdir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);
const stat = promisify(fs.stat);

// Recursively remove directory and all its contents
async function removeDirectoryRecursive(dirPath: string): Promise<void> {
    try {
        if (!fs.existsSync(dirPath)) {
            return;
        }

        const items = await readdir(dirPath);

        for (const item of items) {
            const fullPath = path.join(dirPath, item);
            const stats = await stat(fullPath);

            if (stats.isDirectory()) {
                await removeDirectoryRecursive(fullPath);
            } else {
                await unlink(fullPath);
            }
        }

        await rmdir(dirPath);
        console.log(`Removed directory: ${dirPath}`);
    } catch (error) {
        console.error(`Error removing directory ${dirPath}:`, error);
    }
}

// Function to revert all file operations
export async function revertOperations(operations: FileOperation[], createdDirectories: string[]): Promise<void> {
    console.log('\nReverting all changes...');

    // Revert file operations in reverse order
    for (let i = operations.length - 1; i >= 0; i--) {
        const operation = operations[i];
        try {
            if (fs.existsSync(operation.newPath)) {
                await rename(operation.newPath, operation.originalPath);
                console.log(`Reverted: ${operation.newPath} -> ${operation.originalPath}`);
            }
        } catch (error) {
            console.error(`Error reverting file ${operation.newPath}:`, error);
        }
    }

    // Remove created directories (in reverse order, deepest first)
    // Remove duplicates and sort by depth (deepest first)
    const uniqueDirs = [...new Set(createdDirectories)];
    const sortedDirs = uniqueDirs.sort((a, b) => b.length - a.length);

    for (const dir of sortedDirs) {
        try {
            if (fs.existsSync(dir)) {
                // Check if this directory contains any files that we didn't organize
                const contents = await readdir(dir);
                let hasUnrelatedFiles = false;

                for (const item of contents) {
                    const fullPath = path.join(dir, item);
                    const stats = await stat(fullPath);

                    if (stats.isFile()) {
                        // Check if this file was one of our organized files
                        const wasOrganizedByUs = operations.some(op => op.newPath === fullPath);
                        if (!wasOrganizedByUs) {
                            hasUnrelatedFiles = true;
                            break;
                        }
                    }
                }

                if (!hasUnrelatedFiles) {
                    // Safe to remove this directory and all its contents
                    await removeDirectoryRecursive(dir);
                } else {
                    console.log(`Skipping directory removal (contains unrelated files): ${dir}`);
                }
            }
        } catch (error) {
            console.error(`Error processing directory ${dir}:`, error);
        }
    }

    console.log('Revert complete!');
}

// Function to prompt user for confirmation
export function promptUser(question: string): Promise<boolean> {
    return new Promise((resolve) => {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question, (answer: string) => {
            rl.close();
            resolve(answer.toLowerCase().trim() === 'y' || answer.toLowerCase().trim() === 'yes');
        });
    });
}

// Function to prompt user for directory input
export function promptForDirectory(question: string): Promise<string> {
    return new Promise((resolve) => {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question, (answer: string) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

// Function to prompt user for file conflict resolution
export function promptForFileConflict(existingFile: string, newFile: string): Promise<'keep' | 'replace' | 'rename'> {
    return new Promise((resolve) => {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log(`\n⚠️  File conflict detected:`);
        console.log(`   Existing: ${existingFile}`);
        console.log(`   New file: ${newFile}`);
        console.log(`\nOptions:`);
        console.log(`   1. Keep existing file (skip new file)`);
        console.log(`   2. Replace existing file with new file`);
        console.log(`   3. Rename new file (add number suffix)`);

        rl.question('Enter your choice (1/2/3): ', (answer: string) => {
            rl.close();

            switch (answer.trim()) {
                case '1':
                    resolve('keep');
                    break;
                case '2':
                    resolve('replace');
                    break;
                case '3':
                    resolve('rename');
                    break;
                default:
                    console.log('Invalid choice. Renaming new file by default.');
                    resolve('rename');
                    break;
            }
        });
    });
}
