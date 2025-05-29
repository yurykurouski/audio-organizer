import inquirer from 'inquirer';

// Interactive prompt for target directory selection
export async function promptForTargetDirectory(): Promise<'current' | 'ipod' | 'custom'> {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Choose scanning option:',
            choices: [
                {
                    name: 'Scan current directory recursively',
                    value: 'current'
                },
                {
                    name: 'Scan for iPod music files in iPod_Control/Music folder',
                    value: 'ipod'
                },
                {
                    name: 'Enter custom target folder path',
                    value: 'custom'
                }
            ]
        }
    ]);

    return answer.choice;
}

// Interactive prompt for operation mode selection
export async function promptForOperationMode(): Promise<'copy' | 'move'> {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'mode',
            message: 'Choose operation mode:',
            choices: [
                {
                    name: 'Copy files (original files remain in place)',
                    value: 'copy'
                },
                {
                    name: 'Move files (original files will be moved)',
                    value: 'move'
                }
            ]
        }
    ]);

    return answer.mode;
}

// Interactive prompt for file conflict resolution
export async function promptForFileConflictInteractive(existingFile: string, newFile: string): Promise<'keep' | 'replace' | 'rename'> {
    console.log(`\n⚠️  File conflict detected:`);
    console.log(`   Existing: ${existingFile}`);
    console.log(`   New file: ${newFile}`);


    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'How would you like to resolve this conflict?',
            choices: [
                {
                    name: 'Keep existing file (skip new file)',
                    value: 'keep'
                },
                {
                    name: 'Replace existing file with new file',
                    value: 'replace'
                },
                {
                    name: 'Rename new file (add number suffix)',
                    value: 'rename'
                }
            ]
        }
    ]);

    return answer.action;
}

// Interactive prompt for yes/no confirmation
export async function promptForConfirmation(message: string): Promise<boolean> {
    const answer = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmed',
            message: message,
            default: false
        }
    ]);

    return answer.confirmed;
}

// Interactive prompt for custom directory path input
export async function promptForCustomPath(): Promise<string> {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'path',
            message: 'Enter the full path to scan:',
            validate: (input: string) => {
                if (!input.trim()) {
                    return 'Please enter a valid path';
                }
                return true;
            }
        }
    ]);

    return answer.path.trim();
}

// Interactive prompt for output directory selection
export async function promptForOutputDirectory(): Promise<'default' | 'custom'> {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Choose output directory:',
            choices: [
                {
                    name: 'Use default "Organized_Music" folder in current directory',
                    value: 'default'
                },
                {
                    name: 'Enter custom output directory path',
                    value: 'custom'
                }
            ]
        }
    ]);

    return answer.choice;
}

// Interactive prompt for custom output directory path
export async function promptForCustomOutputPath(): Promise<string> {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'path',
            message: 'Enter the full path for organized music output:',
            validate: (input: string) => {
                if (!input.trim()) {
                    return 'Please enter a valid path';
                }
                return true;
            }
        }
    ]);

    return answer.path.trim();
}
