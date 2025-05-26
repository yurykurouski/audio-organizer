export interface FileInfo {
    filePath: string;
    artist: string;
    album: string;
    title: string;
}

export interface FileOperation {
    originalPath: string;
    newPath: string;
    operation: 'move' | 'copy';
}

export interface OrganizationResult {
    operations: FileOperation[];
    createdDirectories: string[];
}
