const {ipcRenderer} = require('electron')

export default store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === 'ipc/theme') {
      ipcRenderer.send('themeChange', state.config.theme)
    }
  })
  ipcRenderer.on('broadcastTheme', (event, arg) => {
    store.commit('config/setTheme', arg)
  })
}

ipcRenderer.on('message', (event, arg) => {
  console.log('%c arg', 'font-size:13px;color:red;')
})
