# Audio files Organizer with Encoding Fix

This application recursively scans all audio files in directories and subdirectories, reads their metadata using the `music-metadata` package, and organizes them into a proper Artist/Album folder structure.

## Features

- **Recursive scanning**: Finds all audio files in the current directory and all subdirectories
- **Metadata extraction**: Reads artist, album, and title information from ID3 tags
- **Automatic organization**: Creates folder structure: `Artist/Album/Title.mp3`
- **Encoding fix**: Automatically detects and converts Windows-1251 (Cyrillic) encoding to UTF-8
- **Duplicate handling**: Adds numeric suffixes if files with the same name already exist
- **Safe folder names**: Removes invalid characters from folder names
- **ASCII visualization**: Shows a visual tree structure of the organized files
- **Organization summary**: Displays statistics about processed files, artists, and albums
- **File conflict resolution**: Interactive prompts when duplicate files are detected

## Directory Selection Options

The application offers three ways to choose your source directory:

1. **Scan current directory** - Organizes audio files in the current working directory
2. **Scan iPod_Control/Music folder** - Specifically targets iPod's hidden music folder structure
3. **Enter custom target folder path** - Allows you to specify any directory path

When you run the application, you'll be prompted to choose one of these options.

## File Conflict Resolution

When the application encounters a file that already exists in the target location, it will prompt you with three options:

### Conflict Options:

1. **Keep existing file (skip new file)** - The existing file remains unchanged, and the new file is skipped
2. **Replace existing file with new file** - The existing file is removed and replaced with the new file (using the correct filename from metadata)
3. **Rename new file (add number suffix)** - The new file is saved with a numeric suffix (e.g., `song_1.mp3`, `song_2.mp3`)

### Example Conflict Resolution:
```
⚠️  File conflict detected:
   Existing: /path/to/Organized_Music/Artist/Album/Song.mp3
   New file: /path/to/iPod_Control/Music/F01/ABCD.mp3

Options:
   1. Keep existing file (skip new file)
   2. Replace existing file with new file
   3. Rename new file (add number suffix)
Enter your choice (1/2/3): 
```

This ensures you have full control over how duplicate files are handled during the organization process.

#### TODO:
 - Option to create a copy of files instead process in place
 - Whitelst / blacklist file extensions
 - Video files

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
6. Prompt for user input when file conflicts are detected

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
│   ├── Грай/
│   │   └── Зорачкі.mp3
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
