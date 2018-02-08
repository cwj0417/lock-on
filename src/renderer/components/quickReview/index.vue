<template>
    <div class="quick-review">
        <div class="head clearfix" v-if="list.length">
            <div class="like column">
                like
            </div>
            <div class="word column">
                word
            </div>
            <div class="sentence column">
                sentence
            </div>
        </div>
        <div class="empty" v-else>
            <i18n path="empty-recent-added" tag="p">
                <a place="route" @click="$router.push('/search')">{{ $t('add-word-route') }}</a>
                <a place="mini" @click="$electron.ipcRenderer.send('changeToMini')">{{ $t('add-word-mini') }}</a>
            </i18n>
        </div>
        <edit v-model="activeId" v-for="item of list" :word="item" :key="item.id"></edit>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapState, mapActions } from 'vuex'
    import edit from './edit.vue'

    export default {
        name: 'quickReview',
        data () {
            return {
                activeId: null
            }
        },
        components: {edit},
        computed: {
            ...mapState({
                list: state => state.words.words
            })
        },
        methods: {
            ...mapActions({
                search: 'words/search'
            })
        },
        mounted () {
            this.search({
                find: {
                    $where: function () {
                        return new Date().setHours(0, 0, 0, 0).valueOf() < this.createTime.valueOf() || this.rank === 0
                    }
                }
            })
        }
    }
</script>
<style lang="scss">
    .quick-review {
        input {
            height: 30px;
            padding: 5px;
        }
        .head {
            height: 30px;
            line-height: 30px;
            font-weight: bold;
            text-indent: 7px;
        }
        .empty {
            margin: 100px auto;
            width: 500px;
            font-size: 20px;
            a {
                color: var(--minor);
            }
        }
        .column {
            float: left;
        }
        .like {
            padding-left: 25px;
            width: 60px;
            text-align: center;
        }
        .word {
            width: 150px;
        }
        .sentence {
            width: calc(100% - 210px);
        }
    }
</style>
