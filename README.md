# Audio files Organizer with Encoding Fix

This application scans all MP3 files in directories and subdirectories, reads their metadata using the `music-metadata` package, and organizes them into a proper Artist/Album folder structure.

## Features

- **Recursive scanning**: Finds all audio files in the current directory and all subdirectories
- **Metadata extraction**: Reads artist, album, and title information from ID3 tags
- **Automatic organization**: Creates folder structure: `Artist/Album/Title.mp3`
- **Encoding fix**: Automatically detects and converts Windows-1251 (Cyrillic) encoding to UTF-8
- **Duplicate handling**: Adds numeric suffixes if files with the same name already exist
- **Safe folder names**: Removes invalid characters from folder names

## Character Encoding Issue Fix

The application automatically fixes character encoding issues commonly found in files created on Windows systems with Cyrillic text. 

### Examples of Fixed Names:
- `Íåóðî Äóáåëü` → `Нейро Дубель` (Neuro Dubel)
- `Ëÿïèñ Òðóáåöêîé` → `Ляпис Трубецкой` (Lyapis Trubetskoy)

### How the Encoding Fix Works:
1. Detects characters in the range 192-255 (typical of mis-encoded Windows-1251)
2. Converts the text from Windows-1251 to proper UTF-8 encoding
3. Maintains original text if no encoding issues are detected

## Installation

1. Install dependencies:
```bash
npm install
```

## Usage

1. Navigate to the directory containing your audio files
2. Run the application:
```bash
npm run
```

The application will:
1. Scan the current directory and all subdirectories for audio files
2. Create an `Organized_Music` folder
3. Read metadata from each file
4. Create Artist and Album folders as needed
5. Move files to the appropriate location with proper encoding

## File Structure

After running, your files will be organized like this:
```
Organized_Music/
├── Нейро Дубель/
│   ├── Пiво/
│   │   └── Пiво.mp3
│   └── Культура/
│       └── Культура.mp3
├── Ляпис Трубецкой/
│   ├── Дзеці майго горада/
│   │   └── Воiны светла.mp3
│   └── Мумiё/
│       └── Мумiё.mp3
└── Iron Maiden/
    ├── The Final Frontier/
    │   └── Starblind.mp3
    └── Piece of Mind/
        └── Die With Your Boots On.mp3
```

## Scripts

- `npm run` - Build and run the application
- `npm run build` - Compile TypeScript to JavaScript
- `npm run bundle` - Create a single standalone executable using Bun
- `npm run watch` - Watch for changes and recompile
- `npm run dev` - Run in development mode with file watching

## Creating a Standalone Executable

To compile the project into a single executable file that can be run anywhere without dependencies:

```bash
npm run bundle
```

This creates a `audio-organizer` executable file (~58MB) that includes:
- All source code compiled into a single binary
- All Node.js dependencies bundled
- The Bun runtime embedded

### Using the Standalone Executable

Once compiled, you can:

1. **Run it directly in any directory with audio files:**
   ```bash
   ./audio-organizer
   ```

2. **Copy it to any location and run:**
   ```bash
   cp audio-organizer /path/to/your/music/folder/
   cd /path/to/your/music/folder/
   ./audio-organizer
   ```

3. **Add it to your PATH for global usage:**
   ```bash
   cp audio-organizer /usr/local/bin/
   # Now you can run it from anywhere:
   audio-organizer
   ```

The executable will work on any macOS system (arm64) without requiring Node.js, npm, or any other dependencies to be installed.

## Dependencies

- `music-metadata` - For reading audio metadata
- `iconv-lite` - For character encoding conversion
- `typescript` - For TypeScript compilation
- `@types/node` - TypeScript definitions for Node.js

## Technical Details

The application uses:
- **ES Modules** (modern JavaScript module system)
- **TypeScript** for type safety
- **Async/await** for file operations
- **Promisified fs operations** for better error handling
- **Windows-1251 to UTF-8 encoding conversion** for Cyrillic text

## Supported Languages

- English (no conversion needed)
- Cyrillic (automatic Windows-1251 to UTF-8 conversion)
- Other languages that use similar encoding patterns
