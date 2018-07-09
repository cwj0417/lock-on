<template>
    <div class="config-lang clearfix">
        <div class="cl-item" :class="{active: $i18n.locale === 'cn'}" @click="changeLang('cn')">
            中文
        </div>
        <div class="cl-item" :class="{active: $i18n.locale === 'en'}" @click="changeLang('en')">
            english
        </div>
        <div class="cl-item" :class="{active: $i18n.locale === 'ja'}" @click="changeLang('ja')">
            日本語
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapActions } from 'vuex'
    import dbs from '../../db'

    export default {
        methods: {
            ...mapActions({
                _changeLang: 'config/changeLang'
            }),
            changeLang (lang) {
                this.$i18n.locale = lang
                this._changeLang(lang)
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
        }
    }
</script>
<style lang="scss">
    .config-lang {
        .cl-item {
            float: left;
            width: 100px;
            height: 30px;
            padding: 5px;
            cursor: pointer;
            &.active {
                box-shadow: 0 0 5px 5px var(--minor) inset;
            }
        }
    }
</style>
