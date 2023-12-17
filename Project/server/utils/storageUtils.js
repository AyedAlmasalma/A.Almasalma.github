const fs = require('fs').promises;
const path = require('path');

const storageDirectory = path.join(__dirname, '../storage');
const tempDirectory = path.join(__dirname, '../temp');

async function emptyDirectory(directory) {
    try {
        const files = await fs.readdir(directory);
        for (const file of files) {
            const filePath = path.join(directory, file);
            await fs.unlink(filePath);
            console.log(`${file} deleted`);
        }
    } catch (err) {
        console.error(`Error reading/deleting files in ${directory}:`, err);
    }
}

async function emptyStorage() {
    await emptyDirectory(storageDirectory);
}

async function emptyTemp() {
    await emptyDirectory(tempDirectory);
}

async function renameFilesInTemp(fileName) {
    try {
        const files = await fs.readdir(tempDirectory);
        for (const file of files) {
            const filePath = path.join(tempDirectory, file);

            if (!file.endsWith('.dng')) {
                const newFilePath = path.join(tempDirectory, fileName + '.dng');
                await fs.rename(filePath, newFilePath);
                console.log(`${file} renamed to ${fileName}.dng`);
            } else {
                console.log(`${file} is already in the correct format`);
            }
        }
    } catch (err) {
        console.error('Error reading/renaming files in temp directory:', err);
    }
}

module.exports = { emptyStorage, emptyTemp, renameFilesInTemp };

