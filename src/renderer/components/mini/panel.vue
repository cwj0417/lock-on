<style lang="scss">
    .mini {
        .panel {
            width: 150px;
            height: 110px;
            float: left;
            .drop {
                width: 130px;
                height: 70px;
                background: #999;
                .drag {
                    width: 130px;
                    height: 40px;
                    background: #ccc;
                }
            }
        }
    }
</style>
<template>
    <div class="panel">
        <div class="drop">
            <i class="fa fa-trash" @click="($emit('input', '')) && (pin = false) && ($emit('pin', false))"></i>
            <i class="fa fa-map-pin" v-if="!pin" @click="togglePin"></i>
            <i class="fa fa-map-marker" v-if="pin" @click="togglePin"></i>
            <div class="drag" draggable="true">
                {{value}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['value'],
        data () {
            return {
                pin: false
            }
        },
        methods: {
            togglePin () {
                this.pin = !this.pin
                this.$emit('pin', this.pin)
            }
        },
        mounted () {
            let vm = this
            function drag () {
                vm.$emit('startDrag')
            }

            function allowDrop (ev) {
                ev.preventDefault()
            }

            function drop (ev) {
                vm.$emit('endDrag')
                ev.preventDefault()
            }

            let dropEl = this.$el.querySelector('.drop')
            let dragEl = this.$el.querySelector('.drag')
            dragEl.ondragstart = drag
            dropEl.ondrop = drop
            dropEl.ondragover = allowDrop
        }
    }
</script>
