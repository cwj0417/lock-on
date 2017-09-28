<style lang="scss">
    .mini {
        .panel {
            width: 140px;
            height: 60px;
            float: left;
            box-shadow: 0 3px 3px var(--major);
            margin: 29px 0 0 17px;
            .editing {
                animation: shake .2s infinite;
            }
            .drop {
                width: 100%;
                height: 60px;
                &.active {
                    animation: rainbow .2s infinite;
                    i {
                        animation: blinblin 1s infinite;
                    }
                }
                .ops {
                    height: 30px;
                    width: 100%;
                    line-height: 23px;
                    .circle {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        border-bottom: 3px solid var(--major);
                        float: left;
                        margin-top: -25px;
                        margin-left: 5px;
                        text-align: center;
                        i {
                            font-size: 35px;
                            line-height: 50px;
                            margin: 0;
                        }
                    }
                    i {
                        color: var(--major);
                        font-size: 15px;
                        margin-right: 5px;
                        &.separator {
                            color: var(--minor);
                            font-size: 8px;
                            line-height: 10px;
                        }
                    }
                }
                .drag {
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    padding: 0 15px;
                }
            }
        }
    }
</style>
<template>
    <div class="panel">
        <div class="drop" :class="{active: active, editing: current === self}">
            <div class="ops">
                <div class="circle">
                    <i :class="'fa fa-' + icon"></i>
                </div>
                <div class="pull-right">
                    <i class="fa fa-trash" @click="($emit('input', '')) && (pin = false) && ($emit('pin', false))"></i>
                    <i class="separator">|</i>
                    <i class="fa fa-map-pin" v-if="!pin" @click="togglePin"></i>
                    <i class="fa fa-map-marker" v-if="pin" @click="togglePin"></i>
                </div>
            </div>
            <div class="drag txt-ellipsis" draggable="true">
                {{value}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['value', 'current', 'icon'],
        data () {
            return {
                pin: false,
                active: false,
                self: '',
                entered: 0
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
            function drag (ev) {
                vm.$emit('startDrag')
            }
            function allowDrop (ev) {
                ev.preventDefault()
            }
            function drop (ev) {
                vm.entered--
                vm.active = false
                vm.$emit('endDrag')
                ev.preventDefault()
            }
            function enter (ev) {
                if (vm.current !== vm.self) {
                    vm.entered++
                    vm.active = true
                }
            }
            function leave (ev) {
                if (vm.current !== vm.self && !--vm.entered) vm.active = false
            }
            let dropEl = this.$el.querySelector('.drop')
            let dragEl = this.$el.querySelector('.drag')
            dragEl.ondragstart = drag
            dropEl.ondrop = drop
            dropEl.ondragover = allowDrop
            dropEl.ondragenter = enter
            dropEl.ondragleave = leave
        }
    }
</script>
