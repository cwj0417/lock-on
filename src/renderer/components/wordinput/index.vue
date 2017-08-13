<style>

</style>
<template>
    <div>
        <input type="text" @keyup.enter="push($event)">
        <ul>
            <li v-for="item of list">{{item}}</li>
        </ul>
    </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapState({
        list: state => state.words.words
      })
    },
    methods: {
      ...mapMutations({
        add: `words/add`
      }),
      push (e) {
        this.add(e.target.value)
        e.target.value = ''
      }
    }
  }
</script>
