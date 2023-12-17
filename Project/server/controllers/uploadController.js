const { processImage } = require('../utils/imageProcessingUtils');

const { extract } = require('../utils/metadataUtils');

async function uploadHandler(req, res) {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
        
    }

    const { path } = req.file;

    try {
        // Process the image
        const fileName = await processImage(path);
        const tags = await extract(fileName);

        return res.json({ success: true, previewUrl: `storage/${fileName}`, tags });

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Server Error' });
    }
}

module.exports = { uploadHandler };
