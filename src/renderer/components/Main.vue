<style lang="scss">
    .app-head {
        height: 60px;
        background: var(--major);
        .logo {
            width: 200px;
            padding: 20px 0 0 20px;
            line-height: 40px;
            font-size: 25px;
            color: white;
            font-weight: bold;
        }
        .action {
            width: calc(100% - 260px);
            padding: 20px 0 0 20px;
            .icon {
                line-height: 40px;
                font-size: 20px;
                padding: 0 20px;
                color: white;
            }
        }
        .operate {
            width: 60px;
            .minimize {
                height: 20px;
                i {
                    padding-right: 10px;
                    font-size: 15px;
                    color: white;
                    &:hover {
                        color: gray;
                    }
                }
            }
            .user-info {
                height: 40px;
            }
        }
    }

    .app-nav {
        width: 200px;
        overflow: scroll;
    }

    .app-body {
        width: calc(100% - 200px);
        overflow: scroll;
    }
</style>
<template>
    <div class="full-height">
        <div class="app-head app-drag clearfix">
            <div class="logo full-height pull-left">
                <i class="fa fa-motorcycle"></i>
                vocabook
            </div>
            <div class="operate full-height pull-right">
                <div class="minimize">
                    <i class="fa fa-window-minimize pull-right" @click="changeToMini"></i>
                </div>
                <div class="user-info">
                    <div style="border-radius:50%;border:1px solid gray;width:30px;height:30px;font-size:20px;color:white;text-align:center;line-height:30px;">
                        头
                    </div>
                </div>
            </div>
            <div class="action full-height pull-right">
                <div class="icon pull-right">
                    <i class="fa fa-cog" @click="openConfig"></i>
                </div>
            </div>
        </div>
        <div style="height: calc(100% - 60px);">
            <div class="full-height pull-left app-nav">
                <navigator></navigator>
            </div>
            <div class="full-height pull-left app-body">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import navigator from './navigator.vue'

    export default {
        components: {navigator},
        methods: {
            openConfig () {
                this.$electron.ipcRenderer.send('openConfig', `${location.href.substr(0, location.href.indexOf('#'))}#/config`)
            },
            changeToMini () {
                this.$electron.ipcRenderer.send('changeToMini')
            }
        }
    }
</script>
