<style lang="scss">
    .navigator {
        background: #262626;
        .ul-wrap {
            margin-top: 50px;
            ul {
                margin: 0;
                padding: 20px;
                li {
                    list-style: none;
                    font-size: 28px;
                    color: #909090;
                    text-align: center;
                    padding-top: 30px;
                    cursor: pointer;
                    i.active {
                        color: #1fb922;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="full-height pull-left full-width navigator app-drag">
        <div class="ul-wrap">
            <ul>
                <li v-for="item of nav">
                    <i :class="[item.icon, 'app-non-drag', {active: cur === item.url}]" @click="jump(item.url)"></i>
                </li>
                <li>
                    <i class="fa fa-cog" @click="openConfig"></i>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        cur: '/wordInput',
        nav: [{
          url: '/wordInput',
          desc: '输入单词',
          icon: 'fa fa-plus-square-o'
        }, {
          url: '/explore',
          desc: '随便看看',
          icon: 'fa fa-podcast'
        }, {
          url: '/review',
          desc: '复习',
          icon: 'fa fa-eye'
        }, {
          url: '/chart',
          desc: '报表',
          icon: 'fa fa-line-chart'
        }]
      }
    },
    methods: {
      jump (url) {
        this.cur = url
        this.$router.push(url)
      },
      openConfig () {
        let {BrowserWindow} = this.$electron.remote
        let win = new BrowserWindow({
          width: 430,
          height: 404,
          titleBarStyle: 'hidden',
          resizable: false,
          minimizable: false,
          maximizable: false,
          alwaysOnTop: true
        })
        win.on('closed', () => {
          win = null
        })
        win.loadURL(`${location.origin}/#/config`)
      }
    }
  }
</script>
