import { dialog, webContents } from 'electron'
import fs from 'fs'

function broadCast (name, content) {
    webContents.getAllWebContents().forEach(v => {
        v.send(name, content)
    })
}

export function ipt () {
    dialog.showOpenDialog({
        title: 'import data',
        properties: ['openDirectory', 'createDirectory'],
        message: 'import data'
    }, function (pa) {
        if (!pa) return
        let p = pa[0]
        broadCast('import', p)
    })
}

export function xpt () {
    dialog.showSaveDialog({
        title: 'export data',
        defaultPath: `vocabook_backup_${new Date().toLocaleString()}`,
        message: 'export data'
    }, function (p) {
        if (!p) return
        if (!fs.existsSync(p)) fs.mkdir(p)
        broadCast('export', p)
    })
}
