<template>
    <div class="full-height">
        <div class="app-head app-drag">
            <div class="logo full-height">
                <i class="fa fa-linode"></i>
                {{ $t('appName') }}
            </div>
            <div class="action full-height">
                <div class="icon pull-right">
                    <i class="fa fa-cog" @click="openConfig"></i>
                </div>
                <div class="icon pull-right">
                    <i class="fa fa-play-circle" @click="openPlayer"></i>
                </div>
            </div>
            <div class="operate full-height">
                <div class="minimize">
                    <i class="fa fa-map-pin" v-if="!pin" @click="togglePin"></i>
                    <i class="fa fa-map-marker" v-if="pin" @click="togglePin"></i>
                    <i class="fa fa-window-minimize pull-right" @click="changeToMini"></i>
                </div>
                <div class="user-info">
                    <div style="border-radius:50%;border:1px solid gray;width:30px;height:30px;font-size:20px;color:white;text-align:center;line-height:30px;">
                        头
                    </div>
                </div>
            </div>
        </div>
        <div style="height: calc(100% - 60px); display: flex;">
            <div class="full-height app-nav">
                <navigator></navigator>
            </div>
            <div class="full-height app-body">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import navigator from './navigator.vue'
    import dbs from '../db'

    export default {
        data () {
            return {
                pin: false
            }
        },
        components: {navigator},
        methods: {
            openConfig () {
                this.$electron.ipcRenderer.send('openConfig', `${location.href.substr(0, location.href.indexOf('#'))}#/config`)
            },
            changeToMini () {
                this.$electron.ipcRenderer.send('changeToMini')
            },
            togglePin () {
                this.pin = !this.pin
                this.$electron.ipcRenderer.send('pinWindow', this.pin)
            },
            openPlayer () {
                this.$electron.ipcRenderer.send('playerWindow')
            }
        },
        mounted () {
            dbs.get('config').find({
                type: 'lang'
            }, (err, docs) => {
                if (err || !docs.length) return
                let [{lang}] = docs
                this.$i18n.locale = lang
            })
            this.$electron.ipcRenderer.on('broadcastLang', (event, arg) => {
                this.$i18n.locale = arg
            })
        }
    }
</script>
<style lang="scss">
    .app-head {
        height: 60px;
        background: var(--major);
        display: flex;
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
