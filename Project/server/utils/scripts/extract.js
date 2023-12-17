const { load } = require('./index');
const fs = require('fs').promises;
const path = require('path');

async function processTags(fileName) {
    try {
        const dngPath = path.join(__dirname, `../../temp/${fileName}.dng`);
        const tags = await load(dngPath);

        if (tags.ApplicationNotes) {
            delete tags.ApplicationNotes;
        }
        const metadata = await buildObject(tags, dngPath);
        await buildText(metadata, fileName);
        return metadata;
    } catch (err) {
        console.error('Error processing tags:', err);
        throw err;
    }
}

async function buildText(tags, fileName) {
    try {
        const txtPath = path.join(__dirname, `../../storage/${fileName}.txt`);
        await fs.writeFile(txtPath, JSON.stringify(tags, null, 2));
        console.log(`File ${fileName}.txt has been created and written.`);
    } catch (err) {
        console.error('Error writing to file:', err);
        throw err;
    }
}

async function buildObject(tags, dngPath) {
    const tagObject = {};

    for (const name in tags) {
        if (Array.isArray(tags[name])) {
            tagObject[name] = tags[name];
        } else {
            tagObject[name] = typeof tags[name].description === 'string' ? tags[name].description.trim() : tags[name].description;
        }
    }


    const fileSizeBytes = (await fs.stat(dngPath)).size;
    const fileSizeMb = fileSizeBytes / (1024 * 1024);
    tagObject["ImageSize"] = `${fileSizeMb.toFixed(2)} MB`;

    return tagObject;
}

function listTags(tags) {
    for (const name in tags) {
        if (Array.isArray(tags[name])) {
            console.log(`${name}: ${tags[name].map((item) => item.description).join(', ')}`);
        } else {
            console.log(`${name}: ${typeof tags[name].description === 'string' ? tags[name].description.trim() : tags[name].description}`);
        }
    }
}

module.exports = { processTags };
