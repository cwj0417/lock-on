<template>
    <div class="quick-review full-height">
        <div class="head full-height" v-if="list.length">
            <card v-for="item of list" :word="item" :key="item.id"></card>
        </div>
        <div class="empty" v-else>
            <i18n path="empty-recent-added" tag="p">
                <a place="route" @click="$router.push('/search')">{{ $t('add-word-route') }}</a>
                <a place="mini" @click="$electron.ipcRenderer.send('changeToMini')">{{ $t('add-word-mini') }}</a>
            </i18n>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapState, mapActions } from 'vuex'
    import card from './card.vue'

    export default {
        name: 'quickReview',
        components: {card},
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
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            align-content: flex-start;
        }
        .empty {
            margin: 100px auto;
            width: 500px;
            font-size: 20px;
            a {
                color: var(--minor);
            }
        }
    }
</style>
