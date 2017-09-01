<style scoped lang="scss">
    td {
        border: 1px solid black;
    }
</style>
<template>
    <div>
        这里是今天添加的单词, 可以快速修改
        <table>
            <tr>
                <td>word</td>
                <td>definition</td>
                <td>rank</td>
                <td>recognized</td>
                <td>createtime</td>
                <td>sourceurl</td>
                <td>sourceSentence</td>
                <td>finded</td>
            </tr>
            <tr v-for="item of list">
                <td>{{item.word}}</td>
                <td>{{item.definition}}</td>
                <td><Rate allow-half v-model="item.rank"></Rate></td>
                <td><Checkbox v-model="item.recognized"></Checkbox></td>
                <td>{{item.createTime.toLocaleString()}}</td>
                <td>{{item.sourceUrl}}</td>
                <td>{{item.sourceSentence}}</td>
                <td>{{item.finded}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'

  export default {
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
            return new Date().setHours(0, 0, 0, 0).valueOf() < this.createTime.valueOf()
          }
        }
      })
    }
  }
</script>
