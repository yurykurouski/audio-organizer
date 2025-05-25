import * as fs from 'fs';
import { promisify } from 'util';

const mkdir = promisify(fs.mkdir);

// Create directory if it doesn't exist
export async function ensureDirectory(dirPath: string): Promise<void> {
    try {
        await mkdir(dirPath, { recursive: true });
    } catch (error) {
        console.error(`Error creating directory ${dirPath}:`, error);
    }
}
