# Audio Files Organizer with Encoding Fix

A powerful command-line tool that organizes your music collection by reading metadata and creating a clean Artist/Album folder structure. Features an interactive interface with arrow-key navigation and automatic encoding fix for Cyrillic text.

## ✨ Features

### 🎯 Core Features
- **📁 Smart Organization**: Automatically creates `Artist/Album/Title.mp3` folder structure
- **🔍 Recursive Scanning**: Finds all audio files in directories and subdirectories  
- **🏷️ Metadata Extraction**: Reads artist, album, and title from ID3 tags
- **🔄 Flexible Modes**: Copy (preserve originals) or Move files
- **📂 Custom Output**: Choose default or custom output directory location
- **📊 Progress Tracking**: Real-time processing feedback and summary statistics

### 🎮 Interactive Interface
- **⌨️ Arrow Key Navigation**: Navigate all menus using ↑/↓ keys
- **🎯 Visual Selection**: Clear indicators show current selection with `❯` symbol
- **⚡ No Typing Required**: Select options without manual input
- **🛡️ Error Prevention**: Eliminates typos and invalid inputs

### 🌐 Encoding & Compatibility
- **🔤 Automatic Encoding Fix**: Detects and converts Windows-1251 (Cyrillic) to UTF-8
- **📱 iPod Support**: Specialized scanning for iPod_Control/Music folders
- **🔒 Safe File Names**: Removes invalid characters from folder names
- **🎵 Multiple Formats**: Supports MP3, M4A, AAC, AIFF, WAV, and more

### 🛠️ Advanced Features
- **⚔️ Conflict Resolution**: Interactive handling of duplicate files
- **🌳 ASCII Visualization**: Tree structure view of organized files
- **↩️ Revert Operations**: Undo all changes with one command
- **📈 Organization Summary**: Detailed statistics about processed files

## 🚀 Quick Start

### Option 1: Download Pre-compiled Binary (Recommended)
Download the latest pre-compiled executable from the [Releases](https://github.com/yurykurouski/audio-organizer/releases) page:

```bash
# Download the binary for your platform
# macOS (arm64/Intel)
wget https://github.com/yurykurouski/audio-organizer/releases/latest/download/audio-organizer-macos
chmod +x audio-organizer-macos
./audio-organizer-macos

# Windows
# Download audio-organizer-windows.exe and run it

# Linux
wget https://github.com/yurykurouski/audio-organizer/releases/latest/download/audio-organizer-linux
chmod +x audio-organizer-linux
./audio-organizer-linux
```

### Option 2: Compile from Source Code
```bash
# Clone or download the project
git clone https://github.com/yurykurouski/audio-organizer.git
cd audio-organizer
npm install
```

### Run the Application
```bash
npm start
```

The application will guide you through an interactive setup process.

## 📖 How It Works

### 1. Choose Your Source
Select from three scanning options:
- **Current Directory**: Scan your current folder recursively
- **iPod Mode**: Target iPod_Control/Music folder specifically  
- **Custom Path**: Enter any directory path manually

### 2. Select Operation Mode
- **Copy Mode** (Recommended): Preserves original files, creates organized copies
- **Move Mode**: Relocates files to new structure (more storage efficient)

### 3. Choose Output Directory
- **Default**: Use `Organized_Music` folder in the current directory
- **Custom Path**: Specify any custom directory for organized output

### 4. Automatic Processing
The application will:
1. Scan for audio files recursively
2. Extract metadata (artist, album, title)
3. Create organized folder structure
4. Handle encoding issues automatically
5. Resolve file conflicts interactively

### 5. Review & Revert
- View organization summary and file tree
- Option to revert all changes if needed

## 🎬 Example Usage

```bash
$ npm start

=== Audio Files Organizer ===
? Choose scanning option: (Use arrow keys)
❯ Scan current directory recursively
  Scan for iPod music files in iPod_Control/Music folder
  Enter custom target folder path

? Choose operation mode: (Use arrow keys)
❯ Copy files (original files remain in place)
  Move files (original files will be moved)

? Choose output directory: (Use arrow keys)
❯ Use default "Organized_Music" folder in current directory
  Enter custom output directory path

Operation mode: Copy files (originals preserved)
Output directory: /Users/user/Organized_Music

Scanning for audio files in: /Users/user/Music
Found 15 audio files

Processing: /Users/user/Music/random_file.mp3
  Artist: Нейро Дубель
  Album: Пiво  
  Title: Пiво
✅ Copied: random_file.mp3 → /Users/user/Organized_Music/Нейро Дубель/Пiво/Пiво.mp3

Organization complete! 🎉
Files organized in: /Users/user/Organized_Music

📊 Organization Summary:
──────────────────────────────
📁 Total Files Organized: 15
🎤 Unique Artists: 5
💿 Unique Albums: 8
📋 Operation: Copy (originals preserved)
──────────────────────────────

? Do you want to revert all changes? (copied files will be deleted) (y/N)
✨ Changes kept. Files copied and organized.
```

## 📁 Organized File Structure

After processing, your music will be neatly organized:

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

## ⚙️ Detailed Features

### 📂 Operation Modes

#### 🛡️ Copy Mode (Recommended for Safety)
- **Original files remain untouched** in their current location
- **Organized copies** are created in the `Organized_Music` folder
- **Safe for testing** - experiment without losing original file organization
- **Ideal for iPods** - preserves the original iPod file structure while creating a readable copy

#### ⚡ Move Mode (Traditional)
- **Files are moved** from their original location to the organized structure
- **Original file locations become empty** (except for any unprocessed files)
- **More storage efficient** - no duplicate files created
- **Permanent reorganization** of your music library

**Interactive Selection:**
```
? Choose operation mode: (Use arrow keys)
❯ Copy files (original files remain in place)
  Move files (original files will be moved)
```

**For iPod users**: Copy mode allows you to:
- Keep your iPod's original file structure intact
- Create a human-readable organized copy for browsing
- Maintain iPod functionality while having access to properly named files

### ↩️ Revert Operations

Both modes support reverting changes with an interactive confirmation:
- **Copy mode**: Deletes all organized copies, leaving originals untouched
- **Move mode**: Moves files back to their original locations

```
? Do you want to revert all changes? (copied files will be deleted) (y/N)
```

### ⚔️ File Conflict Resolution

When duplicate files are detected, the application presents an interactive menu:

**Conflict Options:**
1. **Keep existing file** - Skip the new file, preserve existing
2. **Replace existing file** - Use the new file with correct metadata filename  
3. **Rename new file** - Add numeric suffix (e.g., `song_1.mp3`, `song_2.mp3`)

**Interactive Resolution:**
```
⚠️  File conflict detected:
   Existing: /path/to/Organized_Music/Artist/Album/Song.mp3
   New file: /path/to/iPod_Control/Music/F01/ABCD.mp3

? How would you like to resolve this conflict? (Use arrow keys)
❯ Keep existing file (skip new file)
  Replace existing file with new file
  Rename new file (add number suffix)
```

Navigate with ↑/↓ arrow keys and press Enter to select. This ensures complete control over duplicate file handling.

### 📁 Output Directory Options

The application provides flexible output directory selection:

**Default Option:**
- Uses `Organized_Music` folder in the current working directory
- Automatically created if it doesn't exist
- Safe and predictable location for organized files

**Custom Path Option:**
- Specify any directory path for organized music output
- Supports both absolute paths (e.g., `/Users/username/Music/MyLibrary`) and relative paths
- Parent directory must exist (the output folder itself will be created)
- Useful for organizing files to external drives, network storage, or specific locations

**Interactive Selection:**
```
? Choose output directory: (Use arrow keys)
❯ Use default "Organized_Music" folder in current directory
  Enter custom output directory path

Enter the full path for organized music output: /Volumes/ExternalDrive/OrganizedMusic
```

**Benefits:**
- **Flexibility**: Choose where your organized music is stored
- **External Storage**: Direct organization to external drives or network locations
- **Custom Organization**: Integrate with existing folder structures
- **Safe Validation**: Ensures parent directory exists before proceeding

### 🌐 Character Encoding Fix

Automatically fixes encoding issues common in Windows-created files with Cyrillic text:

**Examples of Fixed Names:**
- `Íåóðî Äóáåëü` → `Нейро Дубель` (Neuro Dubel)
- `Ëÿïèñ Òðóáåöêîé` → `Ляпис Трубецкой` (Lyapis Trubetskoy)

**How It Works:**
1. Detects characters in range 192-255 (typical Windows-1251 mis-encoding)
2. Converts text from Windows-1251 to proper UTF-8 encoding
3. Maintains original text if no encoding issues detected

### 🎮 Interactive User Interface

**Arrow Key Navigation:**
- Use ↑/↓ arrow keys to navigate menu options
- Press Enter to select an option
- Visual indicators show current selection with `❯` symbol

**Interactive Features:**
- **Directory Selection**: Navigate between scanning options
- **Operation Mode**: Choose copy or move mode
- **Output Directory**: Select default or custom output location
- **File Conflicts**: Resolve duplicates with arrow navigation
- **Confirmations**: Yes/No prompts with clear default values

**Benefits:**
- **No typing required** for most operations
- **Visual feedback** shows current selection
- **Intuitive navigation** familiar to modern CLI users
- **Error prevention** by eliminating manual input mistakes

## 🛠️ Development & Scripts

### Available Scripts

- `npm start` - Build and run the application
- `npm run compile` - Create standalone executable with Bun
- `npm run watch` - Watch for changes and recompile
- `npm run dev` - Run in development mode with file watching
- `npm run lint` - Run ESLint for code quality

## 📦 Creating a Standalone Executable

Build a portable executable that runs anywhere without dependencies:

```bash
npm run compile
```

This creates an `audio-organizer` executable (~20-40MB) that includes:
- All source code compiled into a single binary
- All Node.js dependencies bundled  
- The Bun runtime embedded

### Using the Standalone Executable

**Direct Usage:**
```bash
./audio-organizer
```

**Copy to Any Location:**
```bash
cp audio-organizer /path/to/your/music/folder/
cd /path/to/your/music/folder/
./audio-organizer
```

**Global Installation:**
```bash
cp audio-organizer /usr/local/bin/
# Now run from anywhere:
audio-organizer
```

The executable works on any macOS system (arm64) without requiring Node.js or other dependencies.

## 📚 Technical Details

### Dependencies
- `music-metadata` - Audio metadata extraction
- `iconv-lite` - Character encoding conversion
- `inquirer` - Interactive CLI prompts with arrow-key navigation
- `typescript` - Type-safe development
- `@types/node` & `@types/inquirer` - TypeScript definitions

### Architecture
- **ES Modules** - Modern JavaScript module system
- **TypeScript** - Type safety and better development experience
- **Async/await** - Modern asynchronous file operations
- **Promisified fs operations** - Better error handling
- **Windows-1251 to UTF-8 conversion** - Automatic encoding fix

### Supported Audio Formats
- MP3, M4A, AAC, AIFF, WAV, and more

### Supported Languages
- **English** - No conversion needed
- **Cyrillic** - Automatic Windows-1251 to UTF-8 conversion
- **Other languages** - Using similar encoding patterns

## 🗺️ Roadmap

### Planned Features
- **File Extension Filtering**: Whitelist/blacklist specific formats
- **Video File Support**: Extend beyond audio files
- **Custom Naming Patterns**: Configurable folder/file naming
- **Batch Processing**: Handle multiple directories
- **Configuration Files**: Save user preferences

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application.

## 📄 License

ISC License - Feel free to use and modify as needed.
