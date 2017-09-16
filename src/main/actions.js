import { app, dialog } from 'electron'
import path from 'path'
import fs from 'fs'
import { collections } from '../shared'

let userPath = app.getPath('userData')

export function ipt () {
    dialog.showOpenDialog({
        title: 'import data',
        properties: ['openDirectory', 'createDirectory'],
        message: 'import data'
    }, function (pa) {
        if (!pa) return
        let p = pa[0]
        for (let collection of collections) {
            if (fs.existsSync(path.resolve(p, `${collection}.db`))) {
                fs.writeFileSync(path.resolve(userPath, `${collection}.db`), fs.readFileSync(path.resolve(p, `${collection}.db`)))
            }
        }
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
        for (let collection of collections) {
            if (fs.existsSync(path.resolve(userPath, `${collection}.db`))) {
                fs.writeFileSync(path.resolve(p, `${collection}.db`), fs.readFileSync(path.resolve(userPath, `${collection}.db`)))
            }
        }
    })
}
