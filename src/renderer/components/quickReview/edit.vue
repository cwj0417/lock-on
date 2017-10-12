<template>
    <div class="item clearfix">
        <div class="display clearfix" @click="show ? $emit('input', '') : $emit('input', word._id)">
            <div class="like column">
                <i :class="word.like ? 'fa fa-heart hand heart' : 'fa fa-heart-o hand heart'"
                   @click.stop="mod({word, field: 'like', value: !word.like})"></i>
            </div>
            <div class="word column">
                <span class="txt-ellipsis" v-if="!show" >{{word.word}}</span>
                <input @click.stop="" type="text" v-if="show" :value="word.word" @input="mod({word, field: 'word', value: $event.target.value})">
            </div>
            <div class="sentence column">
                <span class="txt-ellipsis" v-if="!show">{{word.sourceSentence}}</span>
                <p v-if="show">
                    <i class="fa fa-trash"></i>
                    <i class="fa fa-save"></i>
                </p>
            </div>
        </div>
        <transition name="item" mode="out-in">
            <div class="edit clearfix" v-if="show">
                <table>
                    <tr>
                        <td class="key">
                            ranking
                        </td>
                        <td class="value">
                            <Rate :value="word.rank" @input="setRank"></Rate>
                        </td>
                    </tr>
                    <tr>
                        <td class="key">
                            definition
                        </td>
                        <td class="value">
                            <textarea rows="5" :value="word.definition" @input="mod({word, field: 'definition', value: $event.target.value})" />
                        </td>
                    </tr>
                    <tr>
                        <td class="key">
                            sentence
                        </td>
                        <td class="value">
                            <textarea rows="5" :value="word.sourceSentence" @input="mod({word, field: 'sourceSentence', value: $event.target.value})" />
                        </td>
                    </tr>
                    <tr>
                        <td class="key">
                            url
                            <i class="fa fa-share" style="float: right; cursor: pointer; padding-top: 10px;" @click="$electron.shell.openExternal(word.sourceUrl)"></i>
                        </td>
                        <td class="value">
                            <input type="text" :value="word.sourceUrl" @input="mod({word, field: 'sourceUrl', value: $event.target.value})">
                        </td>
                    </tr>
                </table>
            </div>
        </transition>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    export default {
        name: 'edit',
        data () {
            return {
                curEdit: ''
            }
        },
        computed: {
            show () {
                return this.value === this.word._id
            }
        },
        props: ['word', 'value'],
        methods: {
            ...mapActions({
                mod: 'words/update'
            }),
            setRank (value) {
                this.mod({word: this.word, field: 'rank', value})
            }
        }
    }
</script>
<style lang="scss">
    .quick-review {
        .item {
            &:nth-child(2n-1) {
                background: #fafafa;
            }
            &:nth-child(2n) {
                background: #f4f4f4;
            }
            .display {
                height: 30px;
                line-height: 30px;
                cursor: pointer;
            }
            .edit {
                background: #ffffff;
                table {
                    width: 100%;
                    tr {
                        height: 30px;
                        line-height: 30px;
                    }
                    .key {
                        padding-left: 60px;
                        width: 160px;
                    }
                    .value {
                        width: calc(100% - 210px);
                        padding-right: 30px;
                        input {
                            width: 100%;
                        }
                        textarea {
                            padding: 5px;
                            width: 100%;
                            resize: vertical;
                        }
                    }
                }
            }
            .item-enter, .item-leave {
                height: 0;
            }
            .item-enter-active {
                animation: fold-down .2s;
                transform-origin: 0 0;
            }
            .item-enter {
                height: 247px;
            }
            .item-leave-active {
                animation: fold-up .2s;
                transform-origin: 0 0;
            }
            .item-leave-to {
                height: 0;
            }
            @keyframes fold-down {
                from {
                    height: 0;
                    transform: scaleY(0);
                }
                to {
                    height: 247px;
                }
            }
            @keyframes fold-up {
                from {
                    height: 247px;
                }
                to {
                    height: 0;
                    transform: scaleY(0);
                }
            }
        }
    }
</style>
