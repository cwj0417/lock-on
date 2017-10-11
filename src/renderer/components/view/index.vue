<template>
    <div class="viewWrap clearfix full-height">
        <div class="viewContent full-height" :class="{full: !curWord, mini: curWord}">
            <div v-if="curWord">
                <i class="fa fa-backward hand header" @click="curWord = null"></i>
                <span class="header">{{title}}</span>
            </div>
            <div v-else>
                <span class="header">{{title}}</span>
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
        book: {
            search: (vm, id) => ({
                _id: {
                    $in: vm.books.find(({_id}) => _id === id).list
                }
            })
        },
        like: {
            search: () => ({
                like: true
            })
        }
    }

    export default {
        data () {
            return {
                curType: null,
                curWord: null
            }
        },
        name: 'view',
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
    .viewWrap {
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
