<style lang="scss">
    .explore {
        height: 100%;
        .ex-nav {
            height: 20px;
            li {
                list-style: none;
                display: inline-block;
                border-radius: 10px 10px 0 0;
                margin-left: 10px;
            }
            li.active {
                background: #ccc;
            }
        }
        .ex-show {
            height: calc(100% - 20px);
        }
    }
</style>
<template>
    <div class="explore">
        <div class="ex-nav app-drag">
            <ul>
                <li v-for="item of explore" @click="jump(item)" class="hand" :class="{active: cur === item.label}">
                    <i :class="item.icon"></i>
                    <span>{{item.label}}</span>
                </li>
            </ul>
        </div>
        <div class="ex-show">
            <webview src="http://github.com" :webview.sync="webview" :css="{width: '100%', height: '100%'}"></webview>
        </div>
    </div>
</template>
<script>
  import webview from '../common/webview.vue'
  export default {
    components: {webview},
    data () {
      return {
        webview: null,
        cur: 'github',
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
      jump ({url, label}) {
        this.webview.loadURL(url)
        this.cur = label
      }
    }
  }
</script>
