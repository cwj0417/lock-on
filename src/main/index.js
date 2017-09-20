'use strict'

import { app, BrowserWindow, ipcMain, Menu, webContents } from 'electron'

import { autoUpdater } from 'electron-updater'

import { ipt, xpt } from './actions'

const name = app.getName()

let template = [{
    label: 'Edit',
    submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'}
    ]
}, {
    label: 'View',
    submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
    ]
}, {
    role: 'window',
    submenu: [
        {role: 'minimize'},
        {role: 'close'}
    ]
}, {
    role: 'help',
    submenu: [
        {
            label: 'Learn More',
            click () { require('electron').shell.openExternal('https://github.com/fjonas/lock-on/releases') }
        }
    ]
}, {
    label: name,
    submenu: [{
        label: 'About ' + name,
        role: 'about'
    }, {
        label: 'open dev tools',
        click () {
            mainWindow.webContents.openDevTools()
        }
    }, {
        label: 'check update',
        click () {
            autoUpdater.setFeedURL('https://github.com/fjonas/lock-on/releases/download/v0.0.6')
            autoUpdater.checkForUpdates()
        }
    }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click () { app.quit() }
    }]
}, {
    label: 'backup',
    submenu: [{
        label: 'import',
        click () {
            ipt()
        }
    }, {
        label: 'export',
        click () {
            xpt()
        }
    }]
}]

if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            {role: 'about'},
            {type: 'separator'},
            {role: 'services', submenu: []},
            {type: 'separator'},
            {role: 'hide'},
            {role: 'hideothers'},
            {role: 'unhide'},
            {type: 'separator'},
            {role: 'quit'}
        ]
    })
    // Edit menu
    template[0].submenu.push(
        {type: 'separator'},
        {
            label: 'Speech',
            submenu: [
                {role: 'startspeaking'},
                {role: 'stopspeaking'}
            ]
        }
    )
    // Window menu
    template[2].submenu = [
        {role: 'close'},
        {role: 'minimize'},
        {role: 'zoom'},
        {type: 'separator'},
        {role: 'front'}
    ]
}

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let configWindow
let currentWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

const normalConfig = {
    show: false,
    height: 670,
    minHeight: 670,
    useContentSize: true,
    width: 1000,
    minWidth: 1000,
    titleBarStyle: 'hidden',
    webPreferences: {
        webSecurity: false
    }
}

const miniConfig = {
    show: false,
    width: 530,
    height: 110,
    resizable: false,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    frame: false
}

const configConfig = {
    show: false,
    width: 430,
    height: 404,
    titleBarStyle: 'customButtonsOnHover',
    resizable: false,
    minimizable: false,
    maximizable: false
}

function sendStatusToWindow (text) {
    console.log('%c ' + text, 'color: red')
    mainWindow.webContents.send('message', text)
}

function createWindow () {
    currentWindow = 'normal'
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow(normalConfig)
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
        sendStatusToWindow('ttt')
    })
    // mainWindow.webContents.openDevTools()
    mainWindow.loadURL(winURL)
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

function createMini () {
    currentWindow = 'mini'
    mainWindow = new BrowserWindow(miniConfig)
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
    mainWindow.loadURL(`${winURL}#/mini`)
    mainWindow.on('closed', () => {
        mainWindow = null
    })
    mainWindow.on('focus', () => {
        mainWindow.webContents.send('miniFocused')
    })
}

function closeWindow () {
    mainWindow.close()
    mainWindow = null
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        if (currentWindow === 'normal') {
            createWindow()
        }
        if (currentWindow === 'mini') {
            createMini()
        }
    }
})

// auto-updater

autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall()
})
autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...')
})
autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.')
})
autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.')
})
autoUpdater.on('error', (e) => {
    sendStatusToWindow(e.toString())
})
autoUpdater.on('download-progress', (progressObj) => {
    let logMessage = 'Download speed: ' + progressObj.bytesPerSecond
    logMessage = logMessage + ' - Downloaded ' + progressObj.percent + '%'
    logMessage = logMessage + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
    sendStatusToWindow(logMessage)
})

app.on('ready', () => {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})

// ipc communication

ipcMain.on('themeChange', (event, arg) => {
    webContents.getAllWebContents().forEach(v => {
        v.send('broadcastTheme', arg)
    })
})
ipcMain.on('closeWindow', (event, arg) => {
    closeWindow()
})
ipcMain.on('openConfig', (event, arg) => {
    if (configWindow) {
        configWindow.center()
        configWindow.focus()
        return
    }
    configWindow = new BrowserWindow(configConfig)
    configWindow.once('ready-to-show', () => {
        configWindow.show()
    })
    configWindow.on('closed', () => {
        configWindow = null
    })
    configWindow.loadURL(arg)
})

ipcMain.on('changeToMini', (event, arg) => {
    currentWindow = 'mini'
    closeWindow()
    createMini()
})

ipcMain.on('changeToNormal', (event, arg) => {
    currentWindow = 'normal'
    closeWindow()
    createWindow()
})
