<style lang="scss">

</style>
<template>
    <div>
        <wordList :list="list"></wordList>
    </div>
</template>
<script>
    import wordList from '../common/wordList.vue'
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'view',
        components: {wordList},
        computed: {
            ...mapState({
                list: state => state.words.words,
                books: state => state.books.books
            })
        },
        methods: {
            ...mapActions({
                search: 'words/search'
            }),
            init () {
                let {type, id} = this.$route.params
                switch (type) {
                case 'book':
                    this.search({
                        find: {
                            _id: {
                                $in: this.books.find(({_id}) => _id === id).list
                            }
                        }
                    })
                    break
                case 'like':
                    this.search({
                        find: {
                            like: true
                        }
                    })
                    break
                }
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
