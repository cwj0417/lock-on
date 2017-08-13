<style lang="scss">
    .explore {
        li {
            list-style: none;
        }
    }
</style>
<template>
    <div class="explore">
        发现
        <ul>
            <li v-for="item of explore" @click="jump(item.url)" class="hand">
                <i :class="item.icon"></i>
                <span>{{item.label}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        explore: [{
          label: 'github',
          icon: 'fa fa-github',
          url: 'http://github.com'
        }, {
          label: 'twitter',
          icon: 'fa fa-twitter',
          url: 'http://twitter.com'
        }, {
          label: 'medium',
          icon: 'fa fa-medium',
          url: 'http://medium.com'
        }]
      }
    },
    methods: {
      jump (url) {
        this.$electron.shell.openExternal(url)
      }
    }
  }
</script>
