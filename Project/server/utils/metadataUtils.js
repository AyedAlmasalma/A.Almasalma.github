const { processTags } = require('./scripts/extract');


async function extract(fileName) {
    try {
        return await processTags(fileName);
    } catch (error) {
        console.error('Error processing tags:', error);
        throw error;
    }
}

module.exports = { extract };
