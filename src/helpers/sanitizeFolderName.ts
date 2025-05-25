// Sanitize folder names by removing invalid characters
export function sanitizeFolderName(name: string): string {
    return name.replace(/[<>:"/\\|?*]/g, '_').trim();
}
