<style lang="scss">
    .mini {
        .panel {
            width: 150px;
            height: 110px;
            float: left;
            .drag {
                width: 130px;
                height: 40px;
                background: #ccc;
            }
        }
    }
</style>
<template>
    <div class="panel">
        <div class="drag" draggable="true">
            {{value}}
        </div>
    </div>
</template>
<script>
    export default {
        props: ['value']
    }
</script>
