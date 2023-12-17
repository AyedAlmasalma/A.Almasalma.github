<!-- ImagePreview.vue -->
<template>
    <div class="image-preview">
        <img class="decoded-image" id="previewImage" :src="`${previewUrl}.jpg`" alt="Preview Image" />
    </div>
</template>
  
<script>
export default {
    props: {
        previewUrl: String,
    },
};
</script>
