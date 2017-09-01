<style lang="scss">
    .navigator {
        background: var(--bg);
        .ul-wrap {
            margin-top: 50px;
            ul {
                margin: 0;
                padding: 20px 0;
                li {
                    list-style: none;
                    font-size: 25px;
                    color: var(--txt);
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
                            color: var(--major);
                        }
                        p.nv-txt {
                            color: var(--minor);
                        }
                    }
                    &.active {
                        p.nv-icon {
                            color: var(--major);
                        }
                        p.nv-txt {
                            color: var(--minor);
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="full-height pull-left full-width navigator">
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
        this.$electron.ipcRenderer.send('openConfig', `${location.href.substr(0, location.href.indexOf('#'))}#/config`)
      }
    }
  }
</script>
