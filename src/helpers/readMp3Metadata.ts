import * as path from 'path';
import { parseFile } from 'music-metadata';
import { sanitizeFolderName } from './sanitizeFolderName';
import { fixEncoding } from './fixEncoding';
import { FileInfo } from '../types';


// Read metadata from MP3 file
export async function readMp3Metadata(filePath: string): Promise<FileInfo | null> {
    try {
        const metadata = await parseFile(filePath);
        const common = metadata.common;

        // Fix encoding issues and sanitize folder names
        const artist = sanitizeFolderName(fixEncoding(common.artist || 'Unknown Artist'));
        const album = sanitizeFolderName(fixEncoding(common.album || 'Unknown Album'));
        const title = sanitizeFolderName(fixEncoding(common.title || path.basename(filePath, '.mp3')));

        return {
            filePath,
            artist,
            album,
            title
        };
    } catch (error) {
        console.error(`Error reading metadata from ${filePath}:`, error);
        return null;
    }
}
