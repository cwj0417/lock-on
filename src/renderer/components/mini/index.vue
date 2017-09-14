<style lang="scss">
    .mini {
        font-size: 20px;
        .ball {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            float: left;
            margin-left: 50px;
            font-size: 12px;
            line-height: 40px;
            text-align: center;
            &.suc {
                background: rgba(0, 255, 0, .3)
            }
            &.danger {
                background: rgba(255, 255, 0, 0.3)
            }
            &.err {
                background: rgba(255, 0, 0, .3)
            }
        }
    }
</style>
<template>
    <div class="mini app-drag">
        <button @click="changeToNormal">
            (恢复窗口)
        </button>
        <button @click="close">
            (关闭窗口)
        </button>
        <button @click="clear">
            (确定添加)
        </button>
        <div style="width:100%;height:50px;" class="clearfix">
            <div v-if="word" class="ball" :class="word && ex && url ? 'suc' : 'danger'" @click="set('word')"
                 @mouseenter="show('word')" @mouseout="shown = ''">
                {{this.word.substr(0, 7)}}
            </div>
            <div v-else class="ball err" @click="set('word')">
                word
            </div>
            <div v-if="ex" class="ball" :class="word && ex && url ? 'suc' : 'danger'" @click="set('ex')"
                 @mouseenter="show('ex')" @mouseout="shown = ''">
                {{this.ex.substr(0, 7)}}
            </div>
            <div v-else class="ball err" @click="set('ex')">
                example
            </div>
            <div v-if="url" class="ball" :class="word && ex && url ? 'suc' : 'danger'" @click="set('url')"
                 @mouseenter="show('url')" @mouseout="shown = ''">
                {{this.url.substr(0, 7)}}
            </div>
            <div v-else class="ball err" @click="set('url')">
                url
            </div>
        </div>
        <div v-if="shown"
             style="width: 100%; height: 100px; text-align:center; font-weight: bold; overflow: scroll; margin-top: 20px;">
            {{shown}}
        </div>
        <div v-else
             style="width: 100%; height: 100px; text-align:center; font-weight: bold; overflow: scroll; margin-top: 20px;">
            {{message}}
        </div>
    </div>
</template>
<script>
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
        data () {
            return {
                cb: '',
                word: '',
                ex: '',
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
            clear () {
                if (this.word && this.ex && this.url) {
                    this.word = ''
                    this.ex = ''
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
                if (isEx(t) && !this.ex) {
                    this.ex = t
                }
                if (isUrl(t) && !this.url) {
                    this.url = t
                }
            })
        }
    }
</script>
