<template>
    <div class="backup-wrap">
        <div class="gistore">
            <div v-if="hasGist">
                <div v-if="hasId">
                    <span>gist id: {{hasId}}</span>
                    <i style="cursor:pointer;" @click="hasId = false">X</i>
                    <button @click="sync">import from gist(将会丢失本地数据)</button>
                    <button @click="backup">export to gist(远程备份将被覆盖)</button>
                </div>
                <input v-else placeholder="输入描述, 新建gist作为备份" class="w300"
                       @keydown.enter="createGist($event.target.value)">
            </div>
            <div v-else>
                <input placeholder="输入github token, 使用gist来远程备份" class="w300"
                       @keydown.enter="inputToken($event.target.value)">
            </div>
            <ul class="gistList">
                <li v-for="(item,index) in list" :key="index" :class="{active: hasId === item.id}">
                    id: {{item.id}}
                    <a @click="$electron.shell.openExternal(item.html_url)">{{item.description}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import gistore from './gistore'
    // const fileName = 'voca-store.db'
    export default {
        data () {
            return {
                hasGist: false,
                hasId: false,
                list: []
            }
        },
        methods: {
            inputToken (token) {
                gistore.setToken(token)
                .then(list => {
                    this.list = list
                    gistore.saveToken(token)
                }, err => {
                    console.log(err)
                })
            },
            createGist (desc) {
                gistore.createGist(desc)
                .then(id => {
                    this.hasId = id
                    this.getList()
                })
            },
            getList () {
                gistore.$api.getList()
                .then(res => {
                    this.list = res
                }, res => {
                    this.list = res
                })
            },
            backup () {
                gistore.backup().then(res => alert('成功'), e => alert('失败'))
            },
            sync () {
                gistore.sync()
                // .then(res => alert('成功'), e => alert(e))
            }
        },
        mounted () {
            gistore.check()
            .then(res => {
                if (res.token) {
                    this.hasGist = true
                    this.getList()
                }
                if (res.id) {
                    this.hasId = res.id
                }
            })
        }
    }
</script>
<style lang="scss">
    .backup-wrap {
        padding: 5px;
        .w300 {
            width: 300px;
        }
        .active {
            background: #eee;
        }
    }
</style>
