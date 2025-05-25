import * as path from 'path';
import { parseFile } from 'music-metadata';
import { sanitizeFolderName } from './sanitizeFolderName';
import { fixEncoding } from './fixEncoding';
import { FileInfo } from '../types';


// Read metadata from audio file (MP3, M4A)
export async function readAudioMetadata(filePath: string): Promise<FileInfo | null> {
    try {
        const metadata = await parseFile(filePath);
        const common = metadata.common;

        // Get file extension to determine default title
        const ext = path.extname(filePath);
        const basename = path.basename(filePath, ext);

        // Fix encoding issues and sanitize folder names
        const artist = sanitizeFolderName(fixEncoding(common.artist || 'Unknown Artist'));
        const album = sanitizeFolderName(fixEncoding(common.album || 'Unknown Album'));
        const title = sanitizeFolderName(fixEncoding(common.title || basename));

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
