<style lang="scss">
    .config {
        height: 100%;
        .header {
            width: 100%;
            height: 24px;
            background: #e4e2e4;
            text-align: center;
            font-size: 15px;
            line-height: 24px;
        }
        .tabs {
            height: 56px;
            width: 100%;
            background: #e4e2e4;
            padding-left: 5px;
            .tab {
                float: left;
                height: 100%;
                border-radius: 10px 10px 0 0;
                padding: 0 5px;
                i, span {
                    display: block;
                    width: 100%;
                }
                i {
                    font-size: 35px;
                }
                span {
                    font-size: 14px;
                }
            }
            .tab.active {
                background: #c5c3c5;
            }
        }
    }
</style>
<template>
    <div class="config">
        <div class="header app-drag">
            {{map[cur]}}
        </div>
        <div class="tabs app-drag">
            <div class="tab hand app-non-drag" :class="{active: cur === 'word'}" @click="cur = 'word'">
                <i class="fa fa-github"></i>
                <span>{{map['word']}}</span>
            </div>
            <div class="tab hand app-non-drag" :class="{active: cur === 'theme'}" @click="cur = 'theme'">
                <i class="fa fa-twitter"></i>
                <span>{{map['theme']}}</span>
            </div>
            <div class="tab hand app-non-drag" :class="{active: cur === 'explore'}" @click="cur = 'explore'">
                <i class="fa fa-snapchat"></i>
                <span>{{map['explore']}}</span>
            </div>
            <div class="tab hand app-non-drag" :class="{active: cur === 'lang'}" @click="cur = 'lang'">
                <i class="fa fa-language"></i>
                <span>{{map['lang']}}</span>
            </div>
        </div>
        <div class="content" v-if="cur === 'word'">
            单词配置...
        </div>
        <div class="content" v-if="cur === 'theme'">
            <theme></theme>
        </div>
        <div class="content" v-if="cur === 'explore'">
            发现配置...
        </div>
        <div class="content" v-if="cur === 'lang'">
            <lang></lang>
        </div>
    </div>
</template>
<script>
    import theme from './theme.vue'
    import lang from './lang.vue'

    export default {
        name: 'config',
        components: {theme, lang},
        data () {
            return {
                cur: 'word',
                map: {
                    word: '单词',
                    theme: '主题',
                    explore: '发现',
                    lang: '语言'
                }
            }
        }
    }
</script>
