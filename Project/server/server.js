const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();

const uploadController = require('./controllers/uploadController');
const emptyStorageController = require('./controllers/emptyStorageController');

const port = 3000;

// Middleware
app.use(cors());

// Set up file upload using multer
const upload = multer({ dest: 'temp/' });

// Define routes
app.post('/upload', upload.single('file'), uploadController.uploadHandler);
app.get('/clean', emptyStorageController.cleanHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
