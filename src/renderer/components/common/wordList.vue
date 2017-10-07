<style lang="scss">
    .wordList {
        .display {
            .line {
                height: 32px;
                line-height: 32px;
                cursor: pointer;
                border-left: 1px solid #acb5c4;
                border-right: 1px solid #acb5c4;
                border-bottom: 1px solid #acb5c4;
                div {
                    text-align: center;
                    float: left;
                }
                &:nth-child(2n) {
                    background: #f8fdff;
                }
                &.active {
                    background: #e3e3e3;
                }
            }
            .head {
                background: #c5cdd8;
                color: var(--txt);
                div {
                    border-right: 1px solid #acb5c4;
                    &:last-child {
                        border-right: 0;
                    }
                }
            }
            .like {
                width: 33px;
            }
            .word {
                width: 160px;
            }
            .rank {
                position: relative;
                width: 35px;
                .star-high {
                    color: #da5b5d;
                }
                .star-medium {
                    color: #fec634;
                }
                .star-low {
                    color: #f8f051;
                }
                .badge {
                    display: none;
                    position: absolute;
                    top: 2px;
                    left: 25px;
                    line-height: 8px;
                    text-align: center;
                    font-size: 8px;
                }
                &:hover .badge {
                    display: block;
                }
            }
            .sentence {
                padding: 0 10px;
                width: calc(100% - 230px);
            }
        }
    }
</style>
<template>
    <div class="wordList">
        <div class="display">
            <div class="head line">
                <div class="like">
                    like
                </div>
                <div class="word">
                    word
                </div>
                <div class="rank">
                    rank
                </div>
                <div class="sentence" v-if="!mini">
                    sentence
                </div>
            </div>
            <div class="line" :class="{active: curWord && item._id === curWord._id}" v-for="item of list" @click="$emit('detail', item)">
                <div class="like">
                    <i :class="item.like ? 'fa fa-heart hand heart' : 'fa fa-heart-o hand heart'"
                       @click.stop="toggleLike(item)"></i>
                </div>
                <div class="word">
                    {{item.word}}
                </div>
                <div class="rank">
                    <i class="fa fa-star" :class="item.rank >= 4 ? 'star-high' : item.rank >= 2 ? 'star-medium' : 'star-low'"></i>
                    <div class="badge">
                        {{item.rank}}
                    </div>
                </div>
                <div class="sentence txt-ellipsis" style="text-align: left;" v-if="!mini">
                    {{item.sourceSentence}}
                </div>
            </div>
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
        props: ['list', 'mini', 'curWord']
    }
</script>
