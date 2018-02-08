<style lang="scss">

</style>
<template>
    <webview :src="src" :style="css"></webview>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'webview',
        props: ['src', 'css'],
        mounted () {
            this.$emit('update:webview', this.$el)
        }
    }
</script>
