# GitHub Actions CI/CD Pipeline

This project uses GitHub Actions for continuous integration, automated building, and releases.

## Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)
**Triggers:** Push to `main`/`develop` branches, Pull Requests to `main`

**What it does:**
- Runs on every push and pull request
- Lints the code with ESLint
- Type checks with TypeScript
- Tests compilation with Bun
- Verifies executable can be built

### 2. Build and Release Workflow (`.github/workflows/build.yml`)
**Triggers:** Push to `main`/`develop`, Pull Requests, and GitHub Releases

**What it does:**
- Builds executables for multiple platforms:
  - Linux (x64)
  - Windows (x64) 
  - macOS (x64 Intel)
  - macOS (arm64 Apple Silicon)
- Uploads build artifacts for download
- Automatically attaches binaries to GitHub releases

### 3. Dependency Update Workflow (`.github/workflows/update-deps.yml`)
**Triggers:** Weekly schedule (Mondays at 9 AM UTC), Manual trigger

**What it does:**
- Updates all dependencies to latest versions
- Tests the build after updates
- Creates a pull request with the changes

## Setting Up Releases

To create a new release with pre-built binaries:

1. **Create a new tag:**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **Create a GitHub Release:**
   - Go to the repository on GitHub
   - Click "Releases" → "Create a new release"
   - Choose the tag you just created
   - Add release notes
   - Publish the release

3. **Automatic Binary Attachment:**
   - The build workflow will automatically trigger
   - It will build executables for all platforms
   - Binaries will be attached to the release

## Downloaded Artifacts

After each build, you can download the executables from:
- Go to "Actions" tab in GitHub
- Click on the latest build workflow run
- Scroll down to "Artifacts" section
- Download the executable for your platform

## Platform-Specific Binaries

The pipeline creates these executables:
- `audio-organizer-linux-x64` - Linux 64-bit
- `audio-organizer-windows-x64.exe` - Windows 64-bit  
- `audio-organizer-macos-x64` - macOS Intel 64-bit
- `audio-organizer-macos-arm64` - macOS Apple Silicon

## Local Development

The workflows use the same commands available locally:

```bash
# Install dependencies
bun install

# Lint code
bun run lint

# Type check
bun run tsc

# Build executable
bun run compile

# Build JavaScript
bun run build
```

## Requirements

- **Bun Runtime**: The project uses Bun for building executables
- **TypeScript**: For type checking and compilation
- **ESLint**: For code quality checks

All these are automatically installed and configured in the GitHub Actions runners.
