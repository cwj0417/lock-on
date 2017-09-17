import Datastore from 'nedb'
import path from 'path'
import { ipcRenderer, remote } from 'electron'
import { assert } from '../util'
import { collections } from '../../shared'
import fs from 'fs'

let userPath = remote.app.getPath('userData')

let pool = {}

function init () {
    for (let collection of collections) {
        pool[collection] = new Datastore({
            autoload: true,
            filename: path.join(userPath, `/${collection}.db`)
        })
    }
}

init()

ipcRenderer.on('import', function (event, p) {
    for (let collection of collections) {
        if (fs.existsSync(path.resolve(p, `${collection}.db`))) {
            pool[collection].remove({}, {multi: true}, function () {
                fs.writeFileSync(path.resolve(userPath, `${collection}.db`), fs.readFileSync(path.resolve(p, `${collection}.db`)))
                pool[collection] = new Datastore({
                    autoload: true,
                    filename: path.join(userPath, `/${collection}.db`)
                })
            })
        }
    }
})
ipcRenderer.on('export', function (event, p) {
    for (let collection of collections) {
        pool[collection].persistence.compactDatafile()
        pool[collection].on('compaction.done', function () {
            if (fs.existsSync(path.resolve(userPath, `${collection}.db`))) {
                fs.writeFileSync(path.resolve(p, `${collection}.db`), fs.readFileSync(path.resolve(userPath, `${collection}.db`)))
            }
        })
    }
})

export default {
    get (dbName) {
        assert(collections.indexOf(dbName) > -1, 'collection not exists')
        return pool[dbName]
    }
}
