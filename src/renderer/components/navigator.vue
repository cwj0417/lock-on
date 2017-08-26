<style lang="scss">
    .navigator {
        background: #262626;
        .ul-wrap {
            margin-top: 50px;
            ul {
                margin: 0;
                padding: 20px 0;
                li {
                    list-style: none;
                    font-size: 25px;
                    color: #909090;
                    text-align: center;
                    padding-top: 30px;
                    cursor: pointer;
                    p.nv-icon {
                        transition: all 1s;
                    }
                    p.nv-txt {
                        transition: all .5s;
                        font-size: 12px;
                    }
                    &:hover {
                        p.nv-icon {
                            color: #9966ff;
                        }
                        p.nv-txt {
                            color: #6666ff;
                        }
                    }
                }
                li.active {
                    p.nv-icon {
                        color: #6699ff;
                    }
                    p.nv-txt {
                        color: #66ccff;
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
                <li v-for="item of nav" :class="{active: cur === item.url}" @click="jump(item.url)">
                    <p class="nv-icon">
                        <i :class="[item.icon, 'app-non-drag']"></i>
                    </p>
                    <p class="nv-txt">
                        <span>
                            {{item.desc}}
                        </span>
                    </p>
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
        cur: '/search',
        nav: [{
          url: '/search',
          desc: 'search',
          icon: 'fa fa-search'
        }, {
          url: '/quickReview',
          desc: 'recent',
          icon: 'fa fa-window-restore'
        }, {
          url: '/explore',
          desc: 'explore',
          icon: 'fa fa-podcast'
        }, {
          url: '/review',
          desc: 'review',
          icon: 'fa fa-eye'
        }, {
          url: '/chart',
          desc: 'chart',
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
        win.loadURL(`${location.href.substr(0, location.href.indexOf('#'))}#/config`)
//        win.webContents.openDevTools()
      }
    }
  }
</script>
