<template>
    <div class="mini full-height">
        <div class="head app-drag">
            <i class="back-to-normal fa fa-expand" @click="changeToNormal"></i>
            <div class="head-input">
                <input type="text" @input="dict" v-model="word" :placeholder="$t('placeholder-word')">
                <i class="icon fa fa-trash-o" :style="{color: word ? 'var(--major)' : 'var(--bg-disabled)'}" @click="word = ''"></i>
            </div>
        </div>
        <div class="body">
            <div class="def">
                <input type="text" v-model="definition" :placeholder="$t('placeholder-def')">
                <i class="icon fa fa-trash-o" :style="{color: definition ? 'var(--major)' : 'var(--bg-disabled)'}" @click="definition = ''"></i>
            </div>
            <div class="block">
                <div class="txt">
                    <textarea rows="3" v-model="sentence"></textarea>
                </div>
                <div class="op">
                    <div class="pin" @click="pin.sentence = !pin.sentence" :style="{background: pin.sentence? 'var(--major)' : 'var(--bg-dark)'}">
                        <img src="../../assets/image/mini/pin.png" alt="" v-if="!pin.sentence">
                        <img src="../../assets/image/mini/pin_reverse.png" v-else alt="">
                    </div>
                    <div class="trash" @click="sentence = ''">
                        <i class="fa fa-trash-o" :style="{color: sentence ? 'var(--major)' : 'var(--bg-disabled)'}"></i>
                    </div>
                </div>
            </div>
            <div class="block">
                <div class="txt">
                    <textarea rows="3" v-model="url"></textarea>
                </div>
                <div class="op">
                    <div class="pin" @click="pin.url = !pin.url" :style="{background: pin.url? 'var(--major)' : 'var(--bg-dark)'}">
                        <img src="../../assets/image/mini/pin.png" alt="" v-if="!pin.url">
                        <img src="../../assets/image/mini/pin_reverse.png" v-else alt="">
                    </div>
                    <div class="trash" @click="url = ''">
                        <i class="fa fa-trash-o" :style="{color: url ? 'var(--major)' : 'var(--bg-disabled)'}"></i>
                    </div>
                </div>
            </div>
            <div class="record non-select" :class="{enabled: word && sentence && url}" @click="addToDb">record</div>
        </div>
        <div class="bottom app-drag" @click="mini = true">
            <i class="pack fa fa-arrow-up"></i>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapActions } from 'vuex'
    import { getUrl } from '../search/baiduConfig'

    function isWord (p) {
        return !isEx(p) && !isUrl(p)
    }

    function isEx (p) {
        return p.split(' ').length > 2
    }

    function isUrl (p) {
        return p.includes('http://') || p.includes('https://')
    }

    let inputHandle

    export default {
        name: 'mini',
        data () {
            return {
                mini: false,
                word: '',
                definition: '',
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
            search () {
                if (!this.word) {
                    return
                }
                let url = getUrl(this.word, this.fromLang, this.toLang)
                this.$http.get(url)
                .then(res => {
                    this.definition = res.translation[0]
                })
            },
            dict () {
                if (inputHandle) {
                    clearTimeout(inputHandle)
                }
                inputHandle = setTimeout(() => {
                    this.search()
                }, 550)
            },
            changeToNormal () {
                this.$electron.ipcRenderer.send('changeToNormal')
            },
            addToDb () {
                if (this.word && this.sentence && this.url) {
                    this.postWord({
                        word: this.word,
                        definition: this.definition,
                        rank: 0,
                        recognized: false,
                        like: false,
                        createTime: new Date(),
                        sourceSentence: this.sentence,
                        sourceUrl: this.url,
                        finded: 0
                    })
                    .then(_ => {
                        if (!this.pin.sentence) this.sentence = ''
                        if (!this.pin.url) this.url = ''
                        this.word = ''
                        this.definition = ''
                    })
                }
            }
        },
        mounted () {
            this.$electron.ipcRenderer.on('miniFocused', () => {
                this.mini = false
                let t = this.$electron.clipboard.readText()
                if (isWord(t) && !this.word) {
                    this.word = t
                    this.search()
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
            mini (value) {
                let [w, h] = value ? [200, 76] : [200, 363]
                this.$electron.ipcRenderer.send('setWindow', {w, h})
            }
        }
    }
</script>
<style lang="scss">
    .mini {
        input, textarea {
            padding: 0 12px;
        }
        .head {
            width: 200px;
            height: 76px;
            background: var(--major);
            padding: 32px 12px 16px 12px;
            position: relative;
            .head-input {
                width: 176px;
                height: 28px;
                position: relative;
                input {
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                }
                .icon {
                    position: absolute;
                    top: 7px;
                    right: 10px;
                    font-size: 14px;
                }
            }
            .back-to-normal {
                position: absolute;
                top: 5px;
                right: 5px;
                color: #fff;
            }
        }
        .body {
            height: 257px;
            padding: 20px 12px;
            background: var(--bg-dark);
            .def {
                width: 176px;
                height: 27px;
                border-radius: 6px;
                box-shadow: 0 0 8px rgba(234,234,234,0.5);
                position: relative;
                input {
                    width: 100%;
                    height: 100%;
                    border-radius: 6px;
                }
                .icon {
                    position: absolute;
                    top: 7px;
                    right: 10px;
                    font-size: 14px;
                }
            }
            .block {
                margin-top: 20px;
                height: 54px;
                display: flex;
                box-shadow: 0 0 8px rgba(234,234,234,0.5);
                .txt {
                    width: 144px;
                    textarea {
                        padding: 5px 8px;
                        width: 100%;
                        resize: none;
                        height: 100%;
                        border-radius: 6px 0 0 6px;
                    }
                }
                .op {
                    width: 32px;
                    background: var(--bg-dark);
                    border-radius: 0 6px 6px 0;
                    .pin {
                        width: 100%;
                        height: 27px;
                        border-radius: 0 6px 0 0;
                        img {
                            width: 12px;
                            margin-top: 8px;
                            margin-left: 10px;
                            border-radius: 0 6px 0 0;
                        }
                    }
                    .trash {
                        width: 100%;
                        height: 27px;
                        border-radius: 0 0 6px 0;
                        i {
                            font-size: 14px;
                            margin-top: 7px;
                            margin-left: 11px;
                        }
                    }
                }
            }
            .record {
                width: 84px;
                height: 24px;
                line-height: 24px;
                border-radius: 6px;
                text-align: center;
                margin: 19px auto;
                background: var(--bg-disabled);
                color: var(--txt-dark);
                &.enabled {
                    background: var(--major);
                    color: var(--txt);
                }
            }
        }
        .bottom {
            background: var(--major);
            height: 30px;
            line-height: 30px;
            text-align: center;
            .pack {
                color: #fff;
                font-size: 14px;
            }
        }
    }
</style>
