<style lang="scss">
    .mini {
        .tool {
            width: 40px;
            float: left;
            background: var(--major);
            i {
                color: var(--minor);
                &:hover {
                    color: var(--bg);
                }
            }
            div {
                text-align: center;
                &.close {
                    height: 20px;
                }
                &.body {
                    height: calc(100% - 40px);
                    padding-top: 18px;
                    font-size: 20px;
                }
                &.bottom {
                    height: 20px;
                }
            }
        }
        .content {
            width: calc(100% - 40px);
            float: left;
        }
    }
</style>
<template>
    <div class="mini full-height clearfix">
        <div class="tool app-drag full-height">
            <div class="close">
                <i class="fa fa-close" @click="close"></i>
            </div>
            <div class="body">
                <i class="fa fa-calendar-plus-o"></i>
            </div>
            <div class="bottom">
                <i class="fa fa-window-restore" @click="changeToNormal"></i>
            </div>
        </div>
        <div class="content full-height">
            <panel v-model="word" @startDrag="startDrag('word')" @endDrag="endDrag('word')"></panel>
            <panel v-model="def" @startDrag="startDrag('def')" @endDrag="endDrag('def')"></panel>
            <panel v-model="url" @startDrag="startDrag('url')" @endDrag="endDrag('url')"></panel>
        </div>
    </div>
</template>
<script>
    import panel from './panel.vue'

    function isWord (p) {
        return p.split(' ').length < 2 && !isUrl(p)
    }

    function isEx (p) {
        return p.split(' ').length > 2
    }

    function isUrl (p) {
        return p.includes('http://') || p.includes('https://')
    }

    export default {
        components: {panel},
        data () {
            return {
                cb: '',
                word: '',
                def: '',
                url: '',
                message: '',
                shown: ''
            }
        },
        methods: {
            changeToNormal () {
                this.$electron.ipcRenderer.send('changeToNormal')
            },
            close () {
                this.$electron.ipcRenderer.send('closeWindow')
            },
            startDrag () {
                //
            },
            endDrag () {
                //
            },
            clear () {
                if (this.word && this.def && this.url) {
                    this.word = ''
                    this.def = ''
                    this.url = ''
                    this.message = ''
                }
            },
            set (field) {
                if (this.cb) {
                    this[field] = this.cb
                }
            },
            show (field) {
                if (this[field]) {
                    this.shown = this[field]
                }
            }
        },
        mounted () {
            this.$electron.ipcRenderer.on('miniFocused', () => {
                let t = this.$electron.clipboard.readText()
                this.cb = t
                this.message = `正在放置:${t}`
                if (isWord(t) && !this.word) {
                    this.word = t
                    this.message += '单词意思为:xxx'
                }
                if (isEx(t) && !this.def) {
                    this.def = t
                }
                if (isUrl(t) && !this.url) {
                    this.url = t
                }
            })
        }
    }
</script>
