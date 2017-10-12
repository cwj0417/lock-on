<template>
    <div class="review clearfix full-height">
        <div class="viewContent full-height" :class="{full: !curWord, mini: curWord}">
            <div v-if="curWord">
                <i class="fa fa-backward hand header" @click="curWord = null"></i>
                <span class="header">{{title}}</span>
            </div>
            <div v-else class="filter">
                <div class="brief clearfix">
                    <i-input class="ipt-word" v-model="filter.word" :placeholder="$t('search')" icon="ios-search"></i-input>
                    <div class="filter-more" @click="fullFilter = !fullFilter">
                        {{ $t('more-options') }}
                        <i class="fa fa-angle-double-down" :style="{transition: 'all .5s', transform: fullFilter ? 'rotate(180deg)' : 'rotate(0deg)'}"></i>
                    </div>
                </div>
                <div class="more clearfix" v-if="fullFilter === true">
                    <div class="url">
                        <span class="search">
                            {{ $t('sourceUrl') }}:
                        </span>
                        <i-input v-model="filter.sourceUrl" style="width: 200px;"></i-input>
                    </div>
                    <div class="rank">
                        <span class="search">
                            {{ $t('rank') }}:
                        </span>
                        <rate v-model="filter.rankMin" placeholder="rank-min"></rate>
                        <rate v-model="filter.rankMax" placeholder="rank-max"></rate>
                    </div>
                </div>
            </div>
            <wordList :curWord="curWord" :mini="!!curWord" :list="list" @detail="d => {curWord = d}"></wordList>
        </div>
        <div class="viewDetail full-height" :class="{mini: !curWord, full: curWord}">
            <wordDetail :word="curWord"></wordDetail>
        </div>
    </div>
</template>
<script>
    import wordList from '../common/wordList.vue'
    import wordDetail from '../common/wordDetail.vue'
    import { mapState, mapActions } from 'vuex'

    let types = {
        filter: {
            search: (vm, id) => ({
                _id: {
                    $in: vm.books.find(({_id}) => _id === id).list
                }
            })
        },
        all: {
            search: () => ({})
        }
    }

    export default {
        data () {
            return {
                curType: null,
                curWord: null,
                fullFilter: false,
                filter: {
                    rankMin: 1,
                    rankMax: 5
                },
                sortStatus: {
                    word: 0,
                    rank: 0,
                    recognized: 0,
                    createTime: 0,
                    finded: 0
                },
                pageTotal: 1,
                pageSize: 10,
                curPage: 1
            }
        },
        name: 'review',
        components: {wordList, wordDetail},
        computed: {
            ...mapState({
                list: state => state.words.words,
                books: state => state.books.books
            }),
            title () {
                if (this.$route.params.type === 'book') {
                    return this.books.length ? this.books.find(({_id}) => _id === this.$route.params.id).name : ''
                }
                if (this.$route.params.type === 'like') {
                    return 'like'
                }
            }
        },
        methods: {
            ...mapActions({
                search: 'words/search'
            }),
            init () {
                let {type, id} = this.$route.params
                this.curType = types[type]
                if (type === 'book' && !this.books.length) {
                    setTimeout(this.init, 500)
                    return
                }
                this.search({
                    find: this.curType.search(this, id)
                })
            }
        },
        watch: {
            $route: function () {
                this.init()
            }
        },
        mounted () {
            this.init()
        }
    }
</script>
<style lang="scss">
    .review {
        .header {
            font-size: 25px;
            padding: 5px;
        }
        .viewContent {
            overflow: auto;
            transition: all .2s;
            float: left;
            &.full {
                width: 100%;
            }
            &.mini {
                width: calc(100% - 570px);
            }
            .filter {
                .brief {
                    padding: 10px;
                    .ipt-word {
                        width: 200px;
                        float: left;
                    }
                    .filter-more {
                        float: left;
                        line-height: 32px;
                        padding: 0 5px;
                        cursor: pointer;
                    }
                }
                .more {
                    padding: 10px;
                }
            }
        }
        .viewDetail {
            overflow: auto;
            transition: all .2s;
            float: left;
            &.full {
                width: 570px;
            }
            &.mini {
                width: 0;
            }
        }
    }
</style>
