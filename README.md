# Audio files Organizer with Encoding Fix

This application recursively scans all audio files in directories and subdirectories, reads their metadata using the `music-metadata` package, and organizes them into a proper Artist/Album folder structure.

## Features

- **Interactive CLI Interface**: Navigate options using arrow keys for a better user experience
- **Recursive scanning**: Finds all audio files in the current directory and all subdirectories
- **Metadata extraction**: Reads artist, album, and title information from ID3 tags
- **Automatic organization**: Creates folder structure: `Artist/Album/Title.mp3`
- **Copy or Move modes**: Choose to copy files (preserving originals) or move them with interactive selection
- **Encoding fix**: Automatically detects and converts Windows-1251 (Cyrillic) encoding to UTF-8
- **Duplicate handling**: Adds numeric suffixes if files with the same name already exist
- **Safe folder names**: Removes invalid characters from folder names
- **ASCII visualization**: Shows a visual tree structure of the organized files
- **Organization summary**: Displays statistics about processed files, artists, and albums
- **Interactive file conflict resolution**: Arrow-key navigation for handling duplicate files
- **Revert operations**: Interactive confirmation for undoing all changes made during organization

## Directory Selection Options

The application offers three ways to choose your source directory using an interactive menu with arrow-key navigation:

1. **Scan current directory** - Organizes audio files in the current working directory
2. **Scan iPod_Control/Music folder** - Specifically targets iPod's hidden music folder structure
3. **Enter custom target folder path** - Allows you to specify any directory path

When you run the application, you'll see an interactive menu where you can navigate options using ↑/↓ arrow keys and press Enter to select.

## Operation Modes

The application offers two operation modes for handling your audio files:

### 1. Copy Mode (Recommended for Safety)
- **Original files remain untouched** in their current location
- **Organized copies** are created in the `Organized_Music` folder
- **Safe for testing** - you can experiment without losing original file organization
- **Ideal for iPods** - preserves the original iPod file structure while creating a readable copy

### 2. Move Mode (Traditional)
- **Files are moved** from their original location to the organized structure
- **Original file locations become empty** (except for any unprocessed files)
- **More storage efficient** - no duplicate files created
- **Permanent reorganization** of your music library

### How to Choose:

The application now features an interactive menu system. Use your arrow keys (↑/↓) to navigate between options and press Enter to select:

```
? Choose operation mode: (Use arrow keys)
❯ Copy files (original files remain in place)
  Move files (original files will be moved)
```

**For iPod users**: Copy mode is especially useful as it allows you to:
- Keep your iPod's original file structure intact
- Create a human-readable organized copy for browsing
- Maintain iPod functionality while having access to properly named files

### Revert Operations

Both modes support reverting changes with an interactive confirmation dialog:
- **Copy mode**: Deletes all organized copies, leaving originals untouched
- **Move mode**: Moves files back to their original locations

```
? Do you want to revert all changes? (copied files will be deleted) (y/N)
```

## File Conflict Resolution

When the application encounters a file that already exists in the target location, it presents an interactive menu with arrow-key navigation:

### Conflict Options:

1. **Keep existing file (skip new file)** - The existing file remains unchanged, and the new file is skipped
2. **Replace existing file with new file** - The existing file is removed and replaced with the new file (using the correct filename from metadata)
3. **Rename new file (add number suffix)** - The new file is saved with a numeric suffix (e.g., `song_1.mp3`, `song_2.mp3`)

### Example Interactive Conflict Resolution:
```
⚠️  File conflict detected:
   Existing: /path/to/Organized_Music/Artist/Album/Song.mp3
   New file: /path/to/iPod_Control/Music/F01/ABCD.mp3

? How would you like to resolve this conflict? (Use arrow keys)
❯ Keep existing file (skip new file)
  Replace existing file with new file
  Rename new file (add number suffix)
```

Use ↑/↓ arrow keys to navigate and press Enter to select your preferred option. This ensures you have full control over how duplicate files are handled during the organization process.

#### TODO:
 - Whitelst / blacklist file extensions
 - Video files

## Interactive User Interface

The application features a modern, user-friendly command-line interface with:

### Arrow Key Navigation
- Use ↑/↓ arrow keys to navigate through menu options
- Press Enter to select an option
- Visual indicators show your current selection with `❯` symbol

### Interactive Features
- **Directory Selection**: Navigate between scanning options with arrow keys
- **Operation Mode**: Choose copy or move mode using interactive selection
- **File Conflicts**: Resolve duplicate files with arrow-key navigation
- **Confirmations**: Yes/No prompts with default values and clear indicators

### Benefits
- **No typing required** for most operations
- **Visual feedback** shows current selection
- **Intuitive navigation** familiar to users of modern CLI tools
- **Error prevention** by eliminating manual input mistakes

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

The application now includes `inquirer` for enhanced interactive command-line experience with arrow-key navigation.

## Usage

1. Navigate to the directory containing your audio files
2. Run the application:
```bash
npm run
```

The application will:
1. Present an interactive menu to choose a scanning option (current directory, iPod folder, or custom path)
2. Show an interactive menu to select an operation mode (copy or move files)
3. Scan the selected directory and all subdirectories for audio files
4. Create an `Organized_Music` folder
5. Read metadata from each file
6. Create Artist and Album folders as needed
7. Copy or move files to the appropriate location with proper encoding
8. Present interactive menus for user input when file conflicts are detected
9. Display organization summary and directory visualization
10. Offer an interactive confirmation dialog to revert all changes

## Example Workflow

Here's what you'll see when running the application with the new interactive interface:

```bash
$ npm run

=== Audio Files Organizer ===
? Choose scanning option: (Use arrow keys)
❯ Scan current directory recursively
  Scan for iPod music files in iPod_Control/Music folder
  Enter custom target folder path

? Choose operation mode: (Use arrow keys)
❯ Copy files (original files remain in place)
  Move files (original files will be moved)

Operation mode: Copy files (originals preserved)

Scanning for audio files in: /Users/user/iPod_Control/Music
Found 15 audio files

Processing: /Users/user/iPod_Control/Music/F01/BUYJ.mp3
  Artist: Нейро Дубель
  Album: Пiво
  Title: Пiво
Copied: /Users/user/iPod_Control/Music/F01/BUYJ.mp3 -> /Users/user/Organized_Music/Нейро Дубель/Пiво/Пiво.mp3

Organization complete!
Files have been organized in: /Users/user/Organized_Music

📊 Organization Summary:
──────────────────────────────
📁 Total Files Organized: 15
🎤 Unique Artists: 5
💿 Unique Albums: 8
📋 Operation: Copy (originals preserved)
──────────────────────────────

? Do you want to revert all changes? (copied files will be deleted) (y/N)
Changes kept. Files copied and organized.
```

## Future Enhancements

Planned features for future versions:
- Whitelist/blacklist file extensions
- Video file support
- Custom naming patterns
- Batch processing options

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
- `inquirer` - For interactive CLI prompts with arrow-key navigation
- `typescript` - For TypeScript compilation
- `@types/node` - TypeScript definitions for Node.js
- `@types/inquirer` - TypeScript definitions for Inquirer.js

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
