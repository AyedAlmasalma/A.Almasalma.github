const { emptyStorage, emptyTemp } = require('../utils/storageUtils');

async function cleanHandler(req, res) {
    try {
        await emptyTemp();
        await emptyStorage();
        res.json({ success: true, message: 'Storage cleaned' });
    } catch (error) {
        console.error('Error cleaning storage:', error);
        res.status(500).json({ success: false, error: 'Error cleaning storage' });
    }
}

module.exports = { cleanHandler };
