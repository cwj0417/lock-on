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
                    <td width="5%">like</td>
                    <td width="10%" @click="sort('word')"
                        :class="{asc: sortStatus.word === 1, desc: sortStatus.word === -1}">word(sortable)
                    </td>
                    <td width="10%">definition</td>
                    <td width="5%" @click="sort('rank')"
                        :class="{asc: sortStatus.rank === 1, desc: sortStatus.rank === -1}">rank(sortable)
                    </td>
                    <td width="10%" @click="sort('recognized')"
                        :class="{asc: sortStatus.recognized === 1, desc: sortStatus.recognized === -1}">
                        recognized(sortable)
                    </td>
                    <td width="15%" @click="sort('createTime')"
                        :class="{asc: sortStatus.createTime === 1, desc: sortStatus.createTime === -1}">
                        createtime(sortable)
                    </td>
                    <td width="10%">sourceurl</td>
                    <td width="10%">sourceSentence</td>
                    <td width="10%" @click="sort('finded')"
                        :class="{asc: sortStatus.finded === 1, desc: sortStatus.finded === -1}">finded(sortable)
                    </td>
                </tr>
                <tr v-for="item of list">
                    <td>
                        <i :class="item.like ? 'fa fa-heart hand heart' : 'fa fa-heart-o hand heart'"
                           @click="toggleLike(item)"></i>
                    </td>
                    <td>{{item.word}}</td>
                    <td>{{item.definition}}</td>
                    <td>
                        {{item.rank}}
                    </td>
                    <td>
                        <Checkbox v-model="item.recognized"></Checkbox>
                    </td>
                    <td>{{item.createTime.toLocaleString()}}</td>
                    <td>{{item.sourceUrl}}</td>
                    <td>{{item.sourceSentence}}</td>
                    <td>{{item.finded}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'wordList',
        data () {
            return {
                sortStatus: {}
            }
        },
        props: ['list']
    }
</script>
