<style lang="scss">
    .mini {
        font-size: 20px;
    }
</style>
<template>
    <div class="mini app-drag">
        <button @click="changeToNormal">
            (恢复窗口的图标)
        </button>
        <button @click="close">
            (关闭窗口的图标)
        </button>
        <br>
        接收到了剪切板的信息:
        <b>{{message}}</b>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        message: ''
      }
    },
    methods: {
      changeToNormal () {
        this.$electron.ipcRenderer.send('changeToNormal')
      },
      close () {
        this.$electron.ipcRenderer.send('closeWindow')
      }
    },
    mounted () {
      this.$electron.ipcRenderer.on('miniFocused', () => {
        this.message = this.$electron.clipboard.readText()
      })
    }
  }
</script>
