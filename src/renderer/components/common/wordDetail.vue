<style lang="scss">
    .wordDetail {
        width: 100%;
    }
</style>
<template>
    <div class="wordDetail" style="padding: 20px; font-size: 20px;">
        word: {{word.word}}
    </div>
</template>
<script>
    export default {
        props: ['word']
    }
</script>
