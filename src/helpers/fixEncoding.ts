import iconv from 'iconv-lite';


// Fix character encoding issues (Windows-1251 to UTF-8)
export function fixEncoding(text: string): string {
    if (!text) return text;

    // Check if the text contains characters that suggest wrong encoding
    // Windows-1251 characters in the range 192-255 when interpreted as UTF-8
    const hasEncodingIssues = [...text].some(char => {
        const code = char.charCodeAt(0);
        return code >= 192 && code <= 255;
    });

    if (hasEncodingIssues) {
        try {
            // Convert from Windows-1251 to UTF-8
            const rawBytes = Buffer.from(text, 'latin1');
            return iconv.decode(rawBytes, 'win1251');
        } catch (error) {
            console.warn(`Failed to fix encoding for "${text}":`, error);
            return text;
        }
    }

    return text;
}
