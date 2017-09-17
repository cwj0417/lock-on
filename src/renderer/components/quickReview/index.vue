<style scoped lang="scss">
    td {
        border: 1px solid black;
    }
</style>
<template>
    <div>
        这里的单词是系统探测可能需要修改的, 可以快速修改, 探测条件为: 添加时间小于一天 或 星级为0
        <table>
            <tr>
                <td width="10%">like</td>
                <td width="15%">word</td>
                <td width="15%">definition</td>
                <td width="20%">rank</td>
                <td width="20%">sourceurl</td>
                <td width="20%">sourceSentence</td>
            </tr>
            <edit v-for="item of list" :word="item" :key="item.id"></edit>
        </table>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    import edit from './edit.vue'

    export default {
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
