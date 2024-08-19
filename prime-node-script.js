const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');

const {
  updateMainColor,
  removeSignUpScreen,
  updateBundleNameAndroid,
  updateBundleNameiOS,
  setupFirebaseiOS,
  toSetupFirebaseAndroid,
} = require('./node-functions');

// Parse command-line arguments
const argv = yargs(hideBin(process.argv))
  .option('app-name', {
    alias: 'a',
    description: 'The name of your app',
    type: 'string',
    demandOption: true,
  })
  .option('bundle-id', {
    alias: 'b',
    description: 'Your bundle ID',
    type: 'string',
    demandOption: true,
  })
  .option('main-color', {
    alias: 'c',
    description: 'The main theme color of your app (ABC123 format)',
    type: 'string',
    demandOption: true,
  })
  .option('firebase', {
    alias: 'f',
    description: 'Setup Firebase',
    type: 'boolean',
    default: false,
  })
  .option('signup', {
    alias: 's',
    description: 'Include sign up screen',
    type: 'boolean',
    default: false,
  })
  .help()
  .alias('help', 'h').argv;

// Debugging: Log parsed arguments to ensure correctness
console.log('Parsed Arguments:', argv);

const oldAppName = 'demo app';
const newAppName = argv['app-name'];
const newBundleId = argv['bundle-id'];
const mainColor = argv['main-color'];
const setupFirebase = argv.firebase;
const includeSignUp = argv.signup;

// Files to be changed
const specificFiles = [
  'build.gradle',
  'Info.plist',
  'contents.xcworkspacedata',
  'app.json',
  'package.json',
  'settings.gradle',
  'strings.xml',
  'Podfile',
  'AppDelegate.mm',
  'LaunchScreen.storyboard',
  'MainActivity.kt',
  'project.pbxproj',
];

// Function to recursively rename folders (case-insensitive)
function renameFolders(dirPath) {
  fs.readdirSync(dirPath).forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Check if the folder name contains oldAppName as a substring (case-insensitive)
      if (
        file.toLowerCase().includes(oldAppName.replace(/\s/g, '').toLowerCase())
      ) {
        // Create the new folder name by replacing oldAppName with newAppName
        const newFolderName = file.replace(
          new RegExp(oldAppName.replace(/\s/g, ''), 'i'),
          newAppName,
        );
        const newFilePath = path.join(
          dirPath,
          newFolderName.replace(/\s/g, ''),
        );

        // Rename the folder
        fs.renameSync(filePath, newFilePath);
        console.log(`Renamed folder: ${filePath} -> ${newFilePath}`);
        // Recursively rename folders and files in the renamed directory
        renameFolders(newFilePath);
        renameFiles(newFilePath);
        updateFileContents(newFilePath);
      } else {
        // Recursively rename in subdirectories
        renameFolders(filePath);
        renameFiles(filePath);
        updateFileContents(filePath);
      }
    }
  });
}

// Function to rename files (case-insensitive)
function renameFiles(dirPath) {
  fs.readdirSync(dirPath).forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      // Check if the file name contains oldAppName as a substring (case-insensitive)
      if (
        file.toLowerCase().includes(oldAppName.replace(/\s/g, '').toLowerCase())
      ) {
        // Create the new file name by replacing oldAppName with newAppName
        const newFileName = file.replace(
          new RegExp(oldAppName.replace(/\s/g, ''), 'i'),
          newAppName.replace(/\s/g, ''),
        );
        const newFilePath = path.join(dirPath, newFileName);

        // Rename the file
        fs.renameSync(filePath, newFilePath);
        console.log(`Renamed file: ${filePath} -> ${newFilePath}`);
      }
    }
  });
}

// Function to update the content of specific files and files with .xcscheme or *Tests.m extension
function updateFileContents(dirPath) {
  fs.readdirSync(dirPath).forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (
      stats.isFile() &&
      (specificFiles.includes(file) ||
        file.endsWith('.xcscheme') ||
        file.endsWith('Tests.m'))
    ) {
      // Read the file content
      let content = fs.readFileSync(filePath, 'utf8');

      // Replace all instances of oldApName with newAppName (case-insensitive)
      const regex = new RegExp(oldAppName, 'gi');
      content = content.replace(regex, newAppName);

      const regex2 = new RegExp(oldAppName.replace(/\s/g, ''), 'gi');
      content = content.replace(regex2, newAppName.replace(/\s/g, ''));
      // }

      // Write the updated content back to the file
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated content in file: ${filePath}`);
    } else if (stats.isDirectory()) {
      // Recursively update content in subdirectories
      updateFileContents(filePath);
    }
  });
}

renameFolders(__dirname);
renameFiles(__dirname);
updateFileContents(__dirname);

// Update bundle id for android and iOS
updateBundleNameAndroid(__dirname, newBundleId, newAppName);
updateBundleNameiOS(__dirname, newBundleId, newAppName);

// Update the color code AppStyles.js
updateMainColor(mainColor);

// Remove sign up screen if not required
if (!includeSignUp) {
  removeSignUpScreen();
}

// Setup Firebase if required
if (setupFirebase) {
  setupFirebaseiOS(newAppName);
  toSetupFirebaseAndroid();
}

console.log('Setup completed successfully.');
