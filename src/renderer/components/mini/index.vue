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
                <i class="fa fa-minus" @click="minimize"></i>
            </div>
            <div class="body">
                <i class="fa fa-calendar-plus-o" @click="addToDb"></i>
            </div>
            <div class="bottom">
                <i class="fa fa-window-restore" @click="changeToNormal"></i>
                <i class="fa fa-arrow-right" v-if="mini" @click="mini = !mini"></i>
                <i class="fa fa-arrow-left" v-if="!mini" @click="mini = !mini"></i>
            </div>
        </div>
        <div class="content full-height" v-if="!mini">
            <panel v-model="word" @pin="v => {pin.word = v}" @startDrag="startDrag('word')" @endDrag="endDrag('word')"></panel>
            <panel v-model="sentence" @pin="v => {pin.sentence = v}" @startDrag="startDrag('sentence')" @endDrag="endDrag('sentence')"></panel>
            <panel v-model="url" @pin="v => {pin.url = v}" @startDrag="startDrag('url')" @endDrag="endDrag('url')"></panel>
        </div>
    </div>
</template>
<script>
    import panel from './panel.vue'
    import { mapActions } from 'vuex'

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
                mini: false,
                dragging: '',
                word: '',
                sentence: '',
                url: '',
                message: '',
                pin: {
                    word: false,
                    sentence: false,
                    url: false
                }
            }
        },
        methods: {
            ...mapActions({
                postWord: 'words/post'
            }),
            changeToNormal () {
                this.$electron.ipcRenderer.send('changeToNormal')
            },
            close () {
                this.$electron.ipcRenderer.send('closeWindow')
            },
            minimize () {
                this.$electron.ipcRenderer.send('minimize')
            },
            startDrag (v) {
                this.dragging = v
            },
            endDrag (v) {
                [this[this.dragging], this[v]] = [this[v], this[this.dragging]]
            },
            addToDb () {
                if (this.word && this.sentence && this.url) {
                    this.postWord({
                        word: this.word,
                        definition: '',
                        rank: 0,
                        recognized: false,
                        like: false,
                        createTime: new Date(),
                        sourceSentence: this.sentence,
                        sourceUrl: this.url,
                        finded: 0
                    })
                    .then(_ => {
                        if (!this.pin.word) this.word = ''
                        if (!this.pin.sentence) this.sentence = ''
                        if (!this.pin.url) this.url = ''
                    })
                }
            }
        },
        mounted () {
            this.$electron.ipcRenderer.on('miniFocused', () => {
                let t = this.$electron.clipboard.readText()
                if (isWord(t) && !this.word) {
                    // search word's definition
                    this.word = t
                }
                if (isEx(t) && !this.sentence) {
                    this.sentence = t
                }
                if (isUrl(t) && !this.url) {
                    this.url = t
                }
            })
        },
        watch: {
            mini: function (value) {
                let [w, h] = value ? [40, 110] : [530, 110]
                this.$electron.ipcRenderer.send('setMini', {w, h})
            }
        }
    }
</script>
