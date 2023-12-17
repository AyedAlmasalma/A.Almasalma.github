<!-- ImageInfo.vue -->
<template>
    <div class="ImageInfo">
        <ul v-if="tags">
            <li><strong>{{ $t('info.cameraModel') }}</strong> <br/> {{ tags.Model }}</li>
            <li><strong>{{ $t('info.sizeOfRaw') }}</strong> <br/> {{ tags.ImageSize }}</li>
            <li><strong>{{ $t('info.dimensions') }}</strong> <br/> {{ dimensions }}</li>
            <li><strong>{{ $t('info.format') }}</strong> <br/>RAW</li>
            <li><strong>{{ $t('info.samplePrecision') }}</strong> <br/>24 bits</li>
        </ul>
        <p v-else>{{ $t('info.noMetadataAvailable') }}</p>
    </div>
</template>
    
<script>
export default {
    props: {
        tags: Object,
    },
    computed: {
        dimensions() {
            if (this.tags.ImageWidth && this.tags.ImageLength) {
                return `${this.tags.ImageWidth} x ${this.tags.ImageLength}`;
            } else {
                return 'N/A';
            }
        }
    },
};
</script>

<style scoped>
.ImageInfo ul li{
    text-align: left;
    margin-bottom: 16px;
    margin-top: 16px;
}
</style>