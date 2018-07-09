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

const sysConfPath = path.resolve(userPath, 'sysConfig.json')

export const sysConfig = {
    get () {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(sysConfPath)) {
                let res = fs.readFileSync(sysConfPath)
                try {
                    resolve(JSON.parse(res))
                } catch (e) {
                    resolve({})
                }
            } else {
                resolve({})
            }
        })
    },
    set (config) {
        return new Promise((resolve, reject) => {
            fs.writeFile(sysConfPath, JSON.stringify(config), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
}

export const appDb = {
    getContent () {
        return new Promise(resolve => {
            let res = {}
            let length = 0
            for (let collection of collections) {
                pool[collection].persistence.compactDatafile()
                pool[collection].on('compaction.done', function () {
                    if (fs.existsSync(path.resolve(userPath, `${collection}.db`))) {
                        res[collection] = fs.readFileSync(path.resolve(userPath, `${collection}.db`)).toString()
                        length += 1
                        if (length === collections.length) {
                            resolve(res)
                        }
                    } else {
                        length += 1
                    }
                })
            }
        })
    },
    putContent (data) {
        for (let collection of collections) {
            if (data[collection]) {
                pool[collection].remove({}, {multi: true}, function () {
                    fs.writeFile(path.resolve(userPath, `${collection}.db`), data[collection], err => {
                        if (err) return
                        pool[collection] = new Datastore({
                            autoload: true,
                            filename: path.join(userPath, `/${collection}.db`)
                        })
                    })
                })
            }
        }
    }
}

ipcRenderer.on('import', function (event, p) {
    for (let collection of collections) {
        if (fs.existsSync(path.resolve(p, `${collection}.db`))) {
            pool[collection].remove({}, {multi: true}, function () {
                fs.writeFile(path.resolve(userPath, `${collection}.db`), fs.readFileSync(path.resolve(p, `${collection}.db`)), err => {
                    if (err) return
                    pool[collection] = new Datastore({
                        autoload: true,
                        filename: path.join(userPath, `/${collection}.db`)
                    })
                })
            })
        }
    }
})
ipcRenderer.on('export', function (event, p) {
    appDb.getContent()
    .then(res => {
        for (let [collection, value] of Object.entries(res)) {
            fs.writeFileSync(path.resolve(p, `${collection}.db`), value)
        }
    })
})

export default {
    get (dbName) {
        assert(collections.indexOf(dbName) > -1, 'collection not exists')
        return pool[dbName]
    }
}
