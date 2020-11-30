<template>
    <div class="full-height">
        <div class="app-head app-drag">
            <div class="logo full-height">
                <div class="logo-img">
                    <img src="../assets/image/logo.png" alt="">
                </div>
                <div class="logo-txt">
                    {{ $t('appName') }}
                </div>
            </div>
            <div class="full-height placeholder"></div>
            <div class="full-height user">
                <div class="avatar full-height">
                    <img src="../assets/image/avatar.png" alt="">
                </div>
                <div class="nick full-height">
                    昵称
                </div>
                <div class="arrow full-height">
                    <img src="../assets/image/dropdown.png" alt="">
                </div>
            </div>
            <div class="full-height mini">
                <img src="../assets/image/play.png" alt="" @click="openPlayer">
            </div>
            <div class="split"></div>
            <div class="full-height conf">
                <img src="../assets/image/settings.png" alt="" @click="openConfig">
            </div>
        </div>
        <div style="height: calc(100% - 80px); display: flex;">
            <div class="full-height app-nav">
                <navigator></navigator>
                <div class="operate full-width">
                    <img src="../assets/image/nav_mini_disabled.png" alt="" @click="changeToMini">
                    <img src="../assets/image/nav_fixed_disabled.png" v-if="!pin" alt="" @click="togglePin">
                    <img src="../assets/image/nav_fixed_selected.png" v-else alt="" @click="togglePin">
                </div>
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
        height: 80px;
        background: var(--major);
        display: flex;
        .logo {
            width: 200px;
            padding: 34px 26px 16px;
            display: flex;
            .logo-img {
                width: 24px;
                height: 28px;
                img {
                    width: 24px;
                    height: 28px;
                }
                margin-right: 20px;
            }
            .logo-txt {
                font-size: 17px;
                color: var(--txt);
                font-weight: 500;
                line-height: 28px;
            }
        }
        .placeholder {
            flex-grow: 1;
        }
        .user {
            display: flex;
            padding-right: 4px;
            .avatar {
                width: 40px;
                height: 40px;
                margin-top: 30px;
                border-radius: 50%;
                img {
                    width: 100%
                }
            }
            .nick {
                font-size: 16px;
                line-height: 22px;
                margin: 39px 0px 19px 16px;
                color: var(--txt);
            }
            .arrow {
                width: 10px;
                height: 8px;
                margin: 46px 8px auto;
                font-size: 0;
                img {
                    width: 10px;
                    height: 8px;
                }
            }
        }
        .mini {
            width: 68px;
            padding-top: 36px;
            padding-left: 20px;
            img {
                width: 28px;
                height: 28px;
            }
        }
        .split {
            width: 1px;
            height: 16px;
            margin-top: 42px;
            background: var(--minor);
        }
        .conf {
            width: 72px;
            padding-top: 36px;
            padding-left: 20px;
            img {
                width: 28px;
                height: 28px;
            }
        }
    }

    .app-nav {
        width: 200px;
        overflow: hidden;
        .operate {
            height: 40px;
            border-top: 1px solid var(--bg-dark);
            background: var(--bg);
            img {
                width: 24px;
                height: 24px;
                margin: 8px 0 8px 24px;
            }
        }
    }

    .app-body {
        width: calc(100% - 200px);
        background: var(--bg-dark);
        overflow: scroll;
    }
</style>
