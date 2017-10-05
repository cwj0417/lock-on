<style lang="scss">
    .wordList {
        .display {
            table {
                width: 100%;
                table-layout: fixed;
                tr {
                    td {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        border: 1px solid black;
                        &.desc:after {
                            content: "⬆";
                        }
                        &.asc:after {
                            content: "⬇";
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="wordList">
        <div class="display">
            <table>
                <tr>
                    <td width="2%">like</td>
                    <td width="10%">word</td>
                    <!--<td width="10%">definition</td>-->
                    <td width="5%">rank</td>
                    <!--<td width="15%">createtime</td>-->
                    <!--<td width="10%">sourceurl</td>-->
                    <td width="10%" v-if="!mini">sourceSentence</td>
                    <!--<td width="10%">finded</td>-->
                </tr>
                <tr class="hand" v-for="item of list" @click="$emit('detail', item)">
                    <td>
                        <i :class="item.like ? 'fa fa-heart hand heart' : 'fa fa-heart-o hand heart'"
                           @click="toggleLike(item)"></i>
                    </td>
                    <td>{{item.word}}</td>
                    <!--<td>{{item.definition}}</td>-->
                    <td>{{item.rank}}</td>
                    <!--<td>{{item.createTime.toLocaleString()}}</td>-->
                    <!--<td>{{item.sourceUrl}}</td>-->
                    <td v-if="!mini">{{item.sourceSentence}}</td>
                    <!--<td>{{item.finded}}</td>-->
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    export default {
        name: 'wordList',
        data () {
            return {}
        },
        methods: {
            ...mapActions({
                toggleLike: 'words/toggleLike'
            })
        },
        props: ['list', 'mini']
    }
</script>
