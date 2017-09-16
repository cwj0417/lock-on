<style scoped lang="scss">
    td {
        border: 1px solid black;
        height: 32px;
    }
    input {
        height: 32px;
    }
</style>
<template>
    <tr>
        <td>
            <i :class="word.like ? 'fa fa-heart hand heart' : 'fa fa-heart-o hand heart'"
               @click="mod({word, field: 'like', value: !word.like})"></i>
        </td>
        <td>
            <input type="text" :value="word.word" @input="mod({word, field: 'word', value: $event.target.value})">
        </td>
        <td>
            <input type="text" :value="word.definition" @input="mod({word, field: 'definition', value: $event.target.value})">
        </td>
        <td>
            <Rate allow-half :value="word.rank" @input="setRank"></Rate>
        </td>
        <td>
            <input type="text" :value="word.sourceUrl" @input="mod({word, field: 'sourceUrl', value: $event.target.value})">
        </td>
        <td>
            <input type="text" :value="word.sourceSentence" @input="mod({word, field: 'sourceSentence', value: $event.target.value})">
        </td>
    </tr>
</template>
<script>
    import { mapActions } from 'vuex'

    export default {
        data () {
            return {
                curEdit: ''
            }
        },
        props: ['word'],
        methods: {
            ...mapActions({
                mod: 'words/modify'
            }),
            setRank (value) {
                this.mod({word: this.word, field: 'rank', value})
            }
        }
    }
</script>
