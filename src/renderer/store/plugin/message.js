const {ipcRenderer} = require('electron')

export default store => {
    store.subscribe((mutation, state) => {
        if (mutation.type === 'ipc/theme') {
            ipcRenderer.send('themeChange', state.config.theme)
        }
        if (mutation.type === 'ipc/lang') {
            ipcRenderer.send('langChange', mutation.payload)
        }
    })
    ipcRenderer.on('broadcastTheme', (event, arg) => {
        store.commit('config/setTheme', arg)
    })
}
