<style lang="scss">

    .editing {
        animation: shake .2s infinite;
    }

    .wordDetail {
        width: 100%;
        padding: 20px;
        input, textarea {
            border: 1px solid rgb(238, 238, 238);
            outline: none;
        }
        .wordstar {
            .word {
                font-size: 25px;
                font-weight: bold;
                line-height: 30px;
                float: left;
            }
        }
        .defoperate {
            margin-top: 10px;
            font-size: 15px;
            line-height: 17px;
            padding: 5px;
            .definition {
                height: 36px;
                overflow: auto;
                width: calc(100% - 100px);
                float: left;
            }
            .operation {
                float: right;
                i {
                    padding: 3px;
                }
            }
        }
        .sentence {
            padding: 5px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 15px;
            border-top: 1px solid var(--txt);
            height: 120px;
            .url {
                cursor: pointer;
                padding: 10px;
                text-decoration: underline;
                display: inline-block;
            }
        }
    }
</style>
<template>
    <div class="wordDetail" v-if="word">
        <div class="wordstar clearfix">
            <div class="word">
                <span v-if="!editing">{{word.word}}</span>
                <input v-else type="text" :value="word.word" @input="mod({word, field: 'word', value: $event.target.value})">
                <i class="fa fa-check-square-o" style="padding-left: 15px; font-size: 15px; color: var(--minor);"></i>
            </div>
            <Rate class="pull-right" :disabled="!editing" :value="word.rank" @input="setRank" :class="{editing: editing}"></Rate>
        </div>
        <div class="defoperate clearfix">
            <div class="definition">
                <span v-if="!editing">{{word.definition}}</span>
                <textarea v-else rows="2" cols="50" style="resize: none;" :value="word.definition" @input="mod({word, field: 'definition', value: $event.target.value})" />
            </div>
            <div class="operation">
                <Dropdown v-if="!editing">
                    <i class="fa fa-plus-circle"></i>
                    <DropdownMenu slot="list">
                        <DropdownItem :key="_id" @click.native="addToBook(_id, item._id)" v-for="({_id, name}) of books">{{name}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <i class="fa fa-edit" v-if="!editing" @click="editing = true"></i>
                <i class="fa fa-check" v-if="editing" @click="editing = false"></i>
                <i class="fa fa-trash" v-if="!editing"></i>
            </div>
        </div>
        <div class="sentence">
            <span v-if="!editing">{{word.sourceSentence}}</span>
            <textarea v-else rows="5" cols="75" style="resize: vertical;" :value="word.sourceSentence" @input="mod({word, field: 'sourceSentence', value: $event.target.value})" />
        </div>
        <div class="footer">
            <span v-if="!editing" class="url" @click="$electron.shell.openExternal(word.sourceUrl)">{{word.sourceUrl}}</span>
            <input style="width: 100%;" v-else type="text" :value="word.sourceUrl" @input="mod({word, field: 'sourceUrl', value: $event.target.value})">
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'

    export default {
        props: ['word'],
        data () {
            return {
                editing: false
            }
        },
        computed: {
            ...mapState({
                books: state => state.books.books
            })
        },
        methods: {
            ...mapActions({
                mod: 'words/update',
                wordToBook: 'books/addWord'
            }),
            setRank (value) {
                this.mod({word: this.word, field: 'rank', value})
            }
        }
    }
</script>
