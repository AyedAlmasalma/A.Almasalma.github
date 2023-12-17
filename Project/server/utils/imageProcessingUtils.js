const { renameFilesInTemp } = require('../utils/storageUtils');
const Jimp = require('jimp');

async function processImage(inputFile) {
    try {
        // Generate a unique filename
        const fileName = generateRandomString(20);

        // Read the input image
        const image = await Jimp.read(inputFile);

        // Define the output file paths
        const jpgFilePath = `storage/${fileName}.jpg`;

        // Add .jpg files to storage with their respective fileData
        await image.writeAsync(jpgFilePath);

        // Rename the temp folder files
        await renameFilesInTemp(fileName);

        console.log('Image processed successfully');

        // Return the name of the file
        return fileName;
    } catch (err) {
        console.error('Error processing and resizing the image:', err);
        throw err;
    }
}

function generateRandomString(length) {
     const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset[randomIndex];
    }

    return randomString;
}

module.exports = { processImage };
