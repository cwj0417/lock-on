<style lang="scss">

</style>
<template>
    <webview :src="src" style="width: 100%; height: 100%;"></webview>
</template>
<script>
    export default {
        name: 'url',
        data () {
            return {
                src: ''
            }
        },
        watch: {
            '$route.params' ({protocal, url}) {
                this.load(protocal, url)
            }
        },
        methods: {
            load (protocal, url) {
                this.src = `${protocal}://${url}`
            }
        },
        mounted () {
            this.load(this.$route.params.protocal, this.$route.params.url)
        }
    }
</script>
