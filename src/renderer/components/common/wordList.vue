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
                display: flex;
                div {
                    text-align: center;
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
                span {
                    padding: 0 5px;
                }
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
                    {{ $t('like') }}
                </div>
                <div class="word">
                    {{ $t('word') }}
                </div>
                <div class="rank">
                    {{ $t('rank') }}
                </div>
                <div class="sentence" v-if="!mini">
                    {{ $t('sentence') }}
                </div>
            </div>
            <div class="line" :class="{active: curWord && item._id === curWord._id}" v-for="item of list"
                 @click="$emit('detail', item)">
                <div class="like">
                    <i :class="item.like ? 'fa fa-heart hand heart' : 'fa fa-heart-o hand heart'"
                       @click.stop="toggleLike(item)"></i>
                </div>
                <div class="word">
                    <span>{{item.word}}</span>
                    <Dropdown @click.native.stop="">
                        <i class="fa fa-plus-circle"></i>
                        <DropdownMenu slot="list">
                            <DropdownItem :key="_id" @click.native="addToBook(_id, item._id)"
                                          v-for="({_id, name}) of books">{{name}}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="rank">
                    <i class="fa fa-star"
                       :class="item.rank >= 4 ? 'star-high' : item.rank >= 2 ? 'star-medium' : 'star-low'"></i>
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
<script type="text/ecmascript-6">
    import { mapActions, mapState } from 'vuex'

    export default {
        name: 'wordList',
        data () {
            return {}
        },
        computed: {
            ...mapState({
                books: state => state.books.books
            })
        },
        methods: {
            ...mapActions({
                toggleLike: 'words/toggleLike',
                wordToBook: 'books/addWord'
            })
        },
        props: ['list', 'mini', 'curWord']
    }
</script>
