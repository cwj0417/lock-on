<style lang="scss">
    .player {
        transition: all 1s;
        .jump {
            width: 200px;
            height: 35px;
            background: var(--major);
            .fa {
                font-size: 25px;
                width: 35px;
                text-align: center;
                padding: 5px;
                color: var(--minor);
                &:hover {
                    color: var(--bg);
                }
            }
        }
        .select {
            height: calc(100% - 35px);
        }
        .display {
            overflow: hidden;
            .head {
                transition: all .3s;
                display: flex;
                height: 35px;
                padding: 5px;
                .word {
                    font-size: 15px;
                    font-weight: bold;
                    width: 455px;
                    color: black;
                }
                .definition {
                    transition: opacity 1.5s;
                    opacity: 0;
                }
                .stop {
                    font-size: 15px;
                    width: 65px;
                    text-align: center;
                    transition: transform .2s;
                    transform: scale(0);
                }
            }
            .body {
                padding: 5px;
                a {
                    color: black;
                    font-weight: 500;
                    transition: transform .2s;
                }
            }
        }
        .paused {
            .fa {
                font-size: 25px;
                width: 35px;
                text-align: center;
                padding: 5px;
                &:hover {

                }
            }
        }
        &:hover {
            .display {
                .head {
                    background-color: white;
                    .word {
                        color: black;
                    }
                    .definition {
                        opacity: 1;
                    }
                    .stop {
                        transform: scale(1);
                    }
                }
                .body {
                    a {
                        color: black;
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="player full-height flex">
        <div class="full-width app-drag" v-if="!playing">
            <div class="jump">
                <i class="fa fa-close" @click="$electron.ipcRenderer.send('closeWindow')"></i>
                <i class="fa fa-cog" @click="close"></i>
                <i class="fa fa-window-restore" @click="$electron.ipcRenderer.send('changeToNormal')"></i>
            </div>
            <div class="select">
                <Select v-model="selected" style="width:200px" filterable>
                    <Option value='{"all": true}'>{{$t('all')}}</Option>
                    <Option value='{"like": true}'>{{$t('like')}}</Option>
                    <OptionGroup :label="$t('book')">
                        <Option v-for="(item, index) of books" :value="JSON.stringify(item)" :key="index">{{ item.name
                            }}
                        </Option>
                    </OptionGroup>
                    <OptionGroup :label="$t('scheme')">
                        <Option v-for="(item, index) of schemes" :value="JSON.stringify(item)" :key="index">{{ item.name
                            }}
                        </Option>
                    </OptionGroup>
                </Select>
                <Select v-model="interval" style="width:200px">
                    <Option value=5000>5秒</Option>
                    <Option value=10000>10秒</Option>
                    <Option value=20000>20秒</Option>
                </Select>
                <button :disabled="!selected" style="margin: 10px 50px;width: 100px;font-size: 30px;" @click="play">
                    play
                </button>
            </div>
        </div>
        <div class="full-width full-height display" style="background: 'red'" v-else-if="!paused">
            <div class="head app-drag">
                <div class="word">
                    <span>{{list[currentWord] && list[currentWord].word}}</span>
                    <span class="definition">{{list[currentWord] && list[currentWord].definition}}</span>
                </div>
                <div class="stop">
                    <i class="fa fa-pause" @click="pause" style="padding-right: 15px"></i>
                    <i class="fa fa-stop" @click="stop"></i>
                </div>
            </div>
            <div class="body">
                <a @click="list[currentWord] && $electron.shell.openExternal(list[currentWord].sourceUrl)">{{list[currentWord]
                    && list[currentWord].sourceSentence}}</a>
            </div>
        </div>
        <div class="full-width full-height app-drag paused" v-else>
            <i class="fa fa-play" @click="resume"></i>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapState, mapActions } from 'vuex'

    export default {
        data () {
            return {
                playing: false,
                paused: false,
                selected: null,
                currentWord: 0,
                timer: null,
                interval: 10000
            }
        },
        methods: {
            ...mapActions({
                search: 'words/search'
            }),
            close () {
                this.$electron.ipcRenderer.send('openConfig', `${location.href.substr(0, location.href.indexOf('#'))}#/config`)
            },
            play () {
                this.playing = true
                let selected = JSON.parse(this.selected)
                let p = Promise.resolve()
                if (selected.all) {
                    // stands for all
                    p = this.search({})
                }
                if (selected.like) {
                    // stands for like
                    p = this.search({find: {like: true}})
                }
                if (selected.list) {
                    // stands for books
                    this.search({
                        find: {
                            _id: {
                                $in: selected.list
                            }
                        }
                    })
                }
                if (selected.filter) {
                    // stands for scheme
                    let conds = {}
                    let has = (key) => {
                        if (selected.filter.filter[key]) {
                            return true
                        }
                        return false
                    }
                    if (has('recognized')) {
                        conds.recognized = selected.filter.filter.recognized
                    }
                    if (has('word')) {
                        conds.word = new RegExp(selected.filter.filter.word)
                    }
                    if (has('sourceUrl')) {
                        conds.sourceUrl = new RegExp(selected.filter.filter.sourceUrl)
                    }
                    if (has('sourceSentence')) {
                        conds.sourceSentence = new RegExp(selected.filter.filter.sourceSentence)
                    }
                    let sort = selected.filter.sort || {}
                    if (!sort.createTime) {
                        sort.createTime = -1
                    }
                    this.search({
                        find: {
                            ...conds,
                            $where: function () {
                                return (has('rankMin') ? this.rank >= selected.filter.filter.rankMin && this.rank <= selected.filter.filter.rankMax : true) &&
                                        (has('startTime') ? this.createTime.valueOf() > selected.filter.filter.startTime : true) &&
                                        (has('endTime') ? this.createTime.valueOf() < selected.filter.filter.endTime : true)
                            }
                        },
                        sort
                    })
                }
                p.then(res => {
                    this.startPlay()
                })
                return null
            },
            startPlay () {
                this.timer = setInterval(() => {
                    if (this.currentWord === this.list.length - 1) {
                        this.currentWord = 0
                    } else {
                        this.currentWord++
                    }
                }, this.interval)
            },
            stop () {
                this.playing = false
                this.currentWord = 0
                clearInterval(this.timer)
            },
            pause () {
                clearInterval(this.timer)
                this.paused = true
                this.$electron.ipcRenderer.send('setWindow', {w: 35, h: 35})
            },
            resume () {
                this.paused = false
                this.$electron.ipcRenderer.send('setWindow', {w: 530, h: 110})
                this.startPlay()
            }
        },
        computed: {
            ...mapState({
                list: state => state.words.words,
                books: state => state.books.books,
                schemes: state => state.schemes.schemes
            })
        },
        watch: {
            playing: function (value) {
                let [w, h] = value ? [530, 110] : [200, 400]
                this.$electron.ipcRenderer.send('setWindow', {w, h})
                if (value) {
                    document.body.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'
                } else {
                    document.body.style.background = ''
                }
            }
        }
    }
</script>
