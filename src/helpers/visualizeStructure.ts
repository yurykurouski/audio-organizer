import * as fs from 'fs';
import * as path from 'path';

interface DirectoryNode {
    name: string;
    path: string;
    isDirectory: boolean;
    children?: DirectoryNode[];
}

/**
 * Builds a directory tree structure for visualization
 */
function buildDirectoryTree(dirPath: string): DirectoryNode {
    const stats = fs.statSync(dirPath);
    const name = path.basename(dirPath);

    const node: DirectoryNode = {
        name,
        path: dirPath,
        isDirectory: stats.isDirectory()
    };

    if (stats.isDirectory()) {
        try {
            const entries = fs.readdirSync(dirPath);
            node.children = entries
                .filter(entry => !entry.startsWith('.')) // Skip hidden files
                .map(entry => buildDirectoryTree(path.join(dirPath, entry)))
                .sort((a, b) => {
                    // Directories first, then files
                    if (a.isDirectory && !b.isDirectory) return -1;
                    if (!a.isDirectory && b.isDirectory) return 1;
                    return a.name.localeCompare(b.name);
                });
        } catch (error) {
            // If we can't read the directory, just treat it as empty
            node.children = [];
        }
    }

    return node;
}

/**
 * Generates ASCII visualization of directory structure
 */
function generateASCII(node: DirectoryNode, prefix: string = '', isLast: boolean = true, isRoot: boolean = false): string[] {
    const lines: string[] = [];

    // Current node line
    if (isRoot) {
        // Root node - just show the name with trailing slash
        lines.push(`${node.name}/`);
    } else {
        const connector = isLast ? '└── ' : '├── ';
        const displayName = node.isDirectory ? `${node.name}/` : node.name;
        lines.push(`${prefix}${connector}${displayName}`);
    }

    // Children
    if (node.children && node.children.length > 0) {
        const newPrefix = isRoot ? '' : prefix + (isLast ? '    ' : '│   ');

        node.children.forEach((child, index) => {
            const isLastChild = index === node.children!.length - 1;
            const childLines = generateASCII(child, newPrefix, isLastChild, false);
            lines.push(...childLines);
        });
    }

    return lines;
}

/**
 * Creates ASCII visualization of the organized music directory structure
 */
export function visualizeDirectoryStructure(organizedDir: string): string {
    if (!fs.existsSync(organizedDir)) {
        return 'Organized directory does not exist.';
    }

    try {
        const tree = buildDirectoryTree(organizedDir);
        const asciiLines = generateASCII(tree, '', true, true);

        return [
            '',
            '📁 Directory Structure:',
            '═'.repeat(50),
            ...asciiLines,
            '═'.repeat(50),
            ''
        ].join('\n');
    } catch (error) {
        return `Error generating directory visualization: ${error}`;
    }
}

/**
 * Prints a summary of the organization results
 */
export function generateOrganizationSummary(operations: any[]): string {
    const totalFiles = operations.length;
    const artists = new Set<string>();
    const albums = new Set<string>();
    const copyCount = operations.filter(op => op.operation === 'copy').length;
    const moveCount = operations.filter(op => op.operation === 'move').length;

    operations.forEach(op => {
        if (op.newPath) {
            const pathParts = op.newPath.split(path.sep);
            if (pathParts.length >= 3) {
                // Extract artist and album from path structure: Organized_Music/Artist/Album/file
                const artist = pathParts[pathParts.length - 3];
                const album = pathParts[pathParts.length - 2];
                artists.add(artist);
                albums.add(album);
            }
        }
    });

    const summaryLines = [
        '',
        '📊 Organization Summary:',
        '─'.repeat(30),
        `📁 Total Files Organized: ${totalFiles}`,
        `🎤 Unique Artists: ${artists.size}`,
        `💿 Unique Albums: ${albums.size}`
    ];

    if (copyCount > 0 && moveCount > 0) {
        summaryLines.push(`📋 Files Copied: ${copyCount}`);
        summaryLines.push(`📦 Files Moved: ${moveCount}`);
    } else if (copyCount > 0) {
        summaryLines.push(`📋 Operation: Copy (originals preserved)`);
    } else if (moveCount > 0) {
        summaryLines.push(`📦 Operation: Move (originals relocated)`);
    }

    summaryLines.push('─'.repeat(30), '');

    return summaryLines.join('\n');
}
