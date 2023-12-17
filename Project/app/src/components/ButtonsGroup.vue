<!-- ButtonsGroup.vue -->
<template>
    <div>
        <button id="convertToJPG" @click="downloadImage">{{ $t('buttons.convertToJPG') }}</button>
        <button id="loadMetadata" @click="downloadText">{{ $t('buttons.loadMetadata') }}</button>
        <br>
    </div>
</template>
  
<script>
export default {
    props: {
        previewUrl: String, // Prop to receive the image URL
    },
    methods: {
        downloadImage() {
            // Use the received previewUrl prop for the image URL
            const imageUrl = `${this.previewUrl}.jpg`;
            if (imageUrl) {
                // Create an anchor element to trigger the download
                const anchor = document.createElement('a');
                anchor.href = imageUrl;
                anchor.download = 'image.jpg'; // You can specify the desired filename here
                anchor.style.display = 'none';

                // Append the anchor to the document body and trigger the click event
                document.body.appendChild(anchor);
                anchor.click();

                // Clean up the anchor element
                document.body.removeChild(anchor);
            } else {
                // Handle the case where there is no image URL
                console.error('No image URL available for download.');
            }
        },
        downloadText() {
            // Use the received previewUrl prop for the txt URL
            const imageUrl = `${this.previewUrl}.txt`;
            if (imageUrl) {
                // Create an anchor element to trigger the download
                const anchor = document.createElement('a');
                anchor.href = imageUrl;
                anchor.download = 'metadata.txt'; // You can specify the desired filename here
                anchor.style.display = 'none';

                // Append the anchor to the document body and trigger the click event
                document.body.appendChild(anchor);
                anchor.click();

                // Clean up the anchor element
                document.body.removeChild(anchor);
            } else {
                // Handle the case where there is no image URL
                console.error('No metadata URL available for download.');
            }
        },

    },
};
</script>
  