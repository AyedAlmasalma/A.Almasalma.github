<!-- ImageUpload.vue -->
<template>
    <label id="label" class="uploadLabel" for="fileInput">{{ $t('upload.uploadLabel') }}</label>
    <input type="file" id="fileInput" class="fileInput" name="files" accept=".dng" @change="uploadImage" />
</template>

<script>
import axios from 'axios';

export default {
    emits: [
        'image-uploaded',
        'image-tags'
    ],
    methods: {
        uploadImage(event) {
            event.preventDefault();
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                // Use Axios to send the file to the server and update the preview URL
                axios.post('http://127.0.0.1:3000/upload', formData).then(response => {
                    this.$emit('image-uploaded', response.data.previewUrl);
                    this.$emit('image-tags', response.data.tags);
                }).catch(error => {
                    console.error('Error uploading image:', error);
                });
            }
            const files = event.target.files;
            if (files.length === 0) {
                return; 
            }
             const fileType = file.name.split('.').pop();
            if (fileType.toLowerCase() !== 'dng') {
                alert('Please upload a file with a .dng extension.');
}
        },
    },
};
</script>
