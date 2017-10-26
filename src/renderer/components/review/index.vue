<template>
    <div class="review-all full-height">
        <div class="review">
            <div class="viewContent" :class="{full: !curWord, mini: curWord}">
                <div v-if="curWord">
                    <i class="fa fa-backward hand header" @click="curWord = null"></i>
                    <div class="header">{{title}}</div>
                </div>
                <div v-else-if="$route.params.type !== 'scheme'" class="filter">
                    <div class="brief clearfix">
                        <i-input class="ipt-word" @on-change="timer" v-model="filter.word" :placeholder="$t('search')" icon="ios-search"></i-input>
                        <div class="filter-more non-select" @click="fullFilter = !fullFilter">
                            {{ $t('more-options') }}
                            <i class="fa fa-angle-double-down" :style="{transition: 'all .5s', transform: fullFilter ? 'rotate(180deg)' : 'rotate(0deg)'}"></i>
                        </div>
                        <i class="fa fa-hourglass-o fa-spin" v-show="timing" style="line-height: 32px; padding: 0 10px;"></i>
                    </div>
                    <transition name="more" mode="out-in">
                        <div class="more clearfix" v-if="fullFilter === true">
                            <div class="clearfix" style="margin-bottom: 10px;">
                                <div class="sort">
                                    <span @click="sort('rank')" :class="{asc: sortStatus.rank === 1, desc: sortStatus.rank === -1}">
                                        <i class="fa fa-sort-amount-desc"></i> {{ $t('rank') }}
                                    </span>
                                                <span @click="sort('finded')" :class="{asc: sortStatus.finded === 1, desc: sortStatus.finded === -1}">
                                        <i class="fa fa-sort-amount-desc"></i> {{ $t('hot') }}
                                    </span>
                                </div>
                                <div class="save-as">
                                    <i class="fa fa-eraser hand" @click="clear" style="margin-right: 10px;"></i>
                                    <span v-if="existScheme" class="hand padding5" @click="$router.push(`/review/scheme/${existScheme._id}`)">
                                        {{existScheme.name}}
                                        <i class="fa fa-external-link"></i>
                                    </span>
                                    <template v-else>
                                        <i class="fa fa-save hand" v-if="!inputFilterTheme" @click="inputFilterTheme = true"></i>
                                        <i-input v-else :placeholder="$t('save-filter-as')" style="width: 160px;"  @on-blur="inputFilterTheme = false" @on-keyup.enter="saveFilter($event.target.value)" @on-keyup.tab="inputFilterTheme = false" @on-keyup.esc="inputFilterTheme = false"></i-input>
                                    </template>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="url">
                                <span class="search">
                                    {{ $t('sourceUrl') }}:
                                </span>
                                    <i-input @on-change="timer" v-model="filter.sourceUrl" style="width: 200px;"></i-input>
                                </div>
                                <div class="rank">
                                <span class="search">
                                    {{ $t('rank') }}:
                                </span>
                                    <rate v-model="filter.rankMin" placeholder="rank-min" @on-change="timer"></rate>
                                    <rate v-model="filter.rankMax" placeholder="rank-max" @on-change="timer" v-if="fullRank"></rate>
                                    <i class="fa fa-arrow-left" @click="fullRank = !fullRank" :style="{transition: 'all .5s', transform: fullRank ? 'rotate(0deg)' : 'rotate(180deg)'}"></i>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <div class="filter" v-else>
                    <div class="header">
                        {{title}}
                    </div>
                    <div class="fixedFilter" v-for="(value, key) in filter">
                        <span class="key">{{$t(key)}}</span>
                        <span class="value">{{value}}</span>
                    </div>
                    <div class="fixedFilter" v-for="(value, key) in sortStatus" :class="{asc: value === 1, desc: value === -1}">
                        <span>{{$t(key)}}</span>
                    </div>
                </div>
                <wordList :curWord="curWord" :mini="!!curWord" :list="list" @detail="d => {curWord = d}"></wordList>
            </div>
            <div class="viewDetail full-height" :class="{mini: !curWord, full: curWord}">
                <wordDetail :word="curWord"></wordDetail>
            </div>
        </div>
        <div class="pagination">
            <Page :total="pageTotal" size="small" :page-size="pageSize" :current="curPage"
                  @on-change="changePage"></Page>
        </div>
    </div>
</template>
<script>
    import wordList from '../common/wordList.vue'
    import wordDetail from '../common/wordDetail.vue'
    import clone from 'lodash.clonedeep'
    import { mapState, mapActions } from 'vuex'

    let types = {
        scheme: {
            getFilter: (vm, id) => vm.schemes.find(({_id}) => _id === id).filter.filter,
            getSort: (vm, id) => vm.schemes.find(({_id}) => _id === id).filter.sort
        },
        all: {
            getFilter: () => ({
                rankMin: 0,
                rankMax: 5,
                sourceUrl: ''
            }),
            getSort: () => ({})
        }
    }

    export default {
        data () {
            return {
                curType: null,
                curWord: null,
                fullFilter: false,
                fullRank: false,
                timing: false,
                inputFilterTheme: false,
                filter: {
                    rankMin: 0,
                    rankMax: 5,
                    sourceUrl: ''
                },
                sortStatus: {},
                pageTotal: 1,
                pageSize: 10,
                curPage: 1,
                handle: null,
                existScheme: null
            }
        },
        name: 'review',
        components: {wordList, wordDetail},
        computed: {
            ...mapState({
                list: state => state.words.words,
                books: state => state.books.books,
                schemes: state => state.schemes.schemes
            }),
            title () {
                if (this.$route.params.type === 'scheme') {
                    return this.schemes.length ? this.schemes.find(({_id}) => _id === this.$route.params.id).name : ''
                }
            }
        },
        methods: {
            ...mapActions({
                search: 'words/search',
                count: 'words/count',
                addScheme: 'schemes/post'
            }),
            init () {
                this.fullFilter = false
                this.curWord = null
                this.fullRank = false
                let {type, id} = this.$route.params
                if (type === 'scheme' && !this.schemes.length) {
                    setTimeout(this.init, 500)
                    return
                }
                this.curType = types[type]
                this.filter = clone(this.curType.getFilter(this, id))
                this.sortStatus = clone(this.curType.getSort(this, id))
                this.findWords(true)
                setTimeout(() => {
                    this.calcExist()
                }, 500)
            },
            saveFilter (name) {
                if (name.trim()) {
                    let filter = {
                        filter: {},
                        sort: {}
                    }
                    for (let key of ['rankMin', 'rankMax', 'sourceUrl']) {
                        if (this.filter[key] !== undefined && this.filter[key] !== '') {
                            console.log(this.filter[key])
                            filter.filter[key] = this.filter[key]
                        }
                    }
                    filter.sort = clone(this.sortStatus)
                    this.addScheme({
                        name,
                        filter
                    })
                    .then(() => {
                        this.$Message.success(this.$t('succeed'))
                        this.inputFilterTheme = false
                        this.calcExist()
                    }, () => {
                        this.$Message.error(this.$t('error'))
                    })
                } else {
                    this.inputFilterTheme = false
                }
            },
            changePage (number) {
                this.curPage = number
                this.findWords()
            },
            calcExist () {
                let looseEqual = function (a, b) {
                    return JSON.stringify(a.filter) === JSON.stringify(b.filter) && JSON.stringify(a.sort) === JSON.stringify(b.sort)
                }
                this.$nextTick(() => {
                    for (let key in this.filter) {
                        if (this.filter[key] === '') {
                            delete this.filter[key]
                        }
                    }
                    this.existScheme = this.schemes.find(({filter}) => looseEqual(filter, {
                        filter: this.filter,
                        sort: this.sortStatus
                    }))
                    this.$forceUpdate()
                })
            },
            sort (field) {
                this.calcExist()
                if (field in this.sortStatus) {
                    if (this.sortStatus[field] === 1) {
                        this.sortStatus[field] = -1
                    } else {
                        delete this.sortStatus[field]
                    }
                } else {
                    this.sortStatus[field] = 1
                }
                this.curPage = 1
                this.findWords()
            },
            timer () {
                this.calcExist()
                if (this.handle) {
                    clearTimeout(this.handle)
                }
                this.timing = true
                this.handle = setTimeout(() => {
                    this.timing = false
                    this.curPage = 1
                    this.findWords(true)
                }, 650)
            },
            clear () {
                this.curPage = 1
                this.sortStatus = {}
                this.fullRank = false
                this.filter = {
                    rankMin: 0,
                    rankMax: 5,
                    sourceUrl: ''
                }
                this.findWords(true)
            },
            findWords (getTotal = false) {
                let conds = {}
                let has = (key) => {
                    if (this.filter[key]) {
                        return true
                    }
                    return false
                }
                if (has('recognized')) {
                    conds.recognized = this.filter.recognized
                }
                if (has('word')) {
                    conds.word = new RegExp(this.filter.word)
                }
                if (has('sourceUrl')) {
                    conds.sourceUrl = new RegExp(this.filter.sourceUrl)
                }
                if (has('sourceSentence')) {
                    conds.sourceSentence = new RegExp(this.filter.sourceSentence)
                }
                let vm = this
                if (getTotal) {
                    this.count({
                        find: {
                            ...conds,
                            $where: function () {
                                return (has('rankMin') ? this.rank >= vm.filter.rankMin && this.rank <= vm.filter.rankMax : true) &&
                                    (has('startTime') ? this.createTime.valueOf() > vm.filter.startTime : true) &&
                                    (has('endTime') ? this.createTime.valueOf() < vm.filter.endTime : true)
                            }
                        }
                    })
                    .then(res => {
                        this.pageTotal = res
                    })
                }
                let sort = {}
                for (let [key, value] of Object.entries(this.sortStatus)) {
                    sort[key] = value
                }
                if (!sort.createTime) {
                    sort.createTime = -1
                }
                this.search({
                    find: {
                        ...conds,
                        $where: function () {
                            return (has('rankMin') ? this.rank >= vm.filter.rankMin && this.rank <= vm.filter.rankMax : true) &&
                                (has('startTime') ? this.createTime.valueOf() > vm.filter.startTime : true) &&
                                (has('endTime') ? this.createTime.valueOf() < vm.filter.endTime : true)
                        }
                    },
                    sort,
                    skip: this.pageSize * (this.curPage - 1),
                    limit: this.pageSize
                })
            }
        },
        watch: {
            $route () {
                this.init()
            },
            'fullRank' (v) {
                if (this.$route.params.type === 'scheme') return
                if (!v) {
                    this.filter.rankMax = this.filter.rankMin
                    if (this.filter.rankMin === 0) {
                        this.filter.rankMax = 5
                    }
                    this.timer()
                }
            },
            'filter.rankMin' (value) {
                if (this.$route.params.type === 'scheme') return
                if (!this.fullRank && value !== 0) {
                    this.filter.rankMax = value
                } else if (value > this.filter.rankMax) {
                    this.filter.rankMax = value
                }
            },
            'filter.rankMax' (value) {
                if (this.$route.params.type === 'scheme') return
                if (value < this.filter.rankMin) {
                    this.filter.rankMin = value
                }
            }
        },
        mounted () {
            this.init()
        }
    }
</script>
<style lang="scss">
    .review-all {
        .review {
            height: calc(100% - 50px);
            display: flex;
            .header {
                font-size: 25px;
                padding: 5px;
                display: inline-block;
            }
            .fixedFilter {
                display: inline-block;
                padding: 5px;
                background: #eee;
                margin-right: 5px;
                border-radius: 6px;
                .key {
                    &:after {
                        content: ':';
                    }
                }
                .value {
                    color: var(--major);
                    padding: 3px;
                    border-radius: 2px;
                }
                &.desc:after {
                    color: var(--major);
                    content: "⬇";
                }
                &.asc:after {
                    color: var(--major);
                    content: "⬆";
                }
            }
            .viewContent {
                overflow: auto;
                transition: all .2s;
                float: left;
                user-select: none;
                &.full {
                    width: 100%;
                }
                &.mini {
                    width: calc(100% - 570px);
                }
                .filter {
                    .timer-bar {
                        height: 4px;
                        div {
                            width: 100%;
                            background: var(--minor);
                            height: 100%;
                        }
                    }
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
                    .more-enter, .more-leave {
                        height: 0;
                    }
                    .more-enter-active {
                        animation: more-fold-down .2s;
                        transform-origin: 0 0;
                    }
                    .more-enter {
                        height: 247px;
                    }
                    .more-leave-active {
                        animation: more-fold-up .2s;
                        transform-origin: 0 0;
                    }
                    .more-leave-to {
                        height: 0;
                    }
                    @keyframes more-fold-down {
                        from {
                            height: 0;
                            transform: scaleY(0);
                        }
                        to {
                            height: 94px;
                        }
                    }
                    @keyframes more-fold-up {
                        from {
                            height: 94px;
                        }
                        to {
                            height: 0;
                            transform: scaleY(0);
                        }
                    }
                    .more {
                        padding: 10px;
                        .sort {
                            float: left;
                            height: 32px;
                            span {
                                display: inline-block;
                                line-height: 32px;
                                background: #eeeeee;
                                height: 32px;
                                cursor: pointer;
                                padding-left: 5px;
                                border-radius: 5px;
                                user-select: none;
                                &:after {
                                    display: inline-block;
                                    content: "";
                                    width: 12px;
                                }
                                &.desc, &.asc {
                                    background: var(--minor);
                                }
                                &.desc:after {
                                    content: "⬇";
                                }
                                &.asc:after {
                                    content: "⬆";
                                }
                            }
                        }
                        .save-as {
                            float: left;
                            height: 32px;
                            line-height: 32px;
                            padding-left: 40px;
                        }
                        .search {
                            display: inline-block;
                            line-height: 32px;
                            height: 32px;
                            vertical-align: middle;
                        }
                        .url {
                            padding-left: 5px;
                            float: left;
                        }
                        .rank {
                            padding-left: 10px;
                            float: left;
                            .ivu-rate {
                                border-radius: 5px;
                                border: 1px solid #eee;
                            }
                        }
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
        .pagination {
            text-align: center;
            padding: 13px 0;
        }
    }
</style>
