import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'
import { assert } from '../util'
import { collections } from '../../shared'

let pool = {}

export default {
    get (dbName) {
        assert(collections.indexOf(dbName) > -1, 'collection not exists')
        return pool[dbName] || ((pool[dbName] = new Datastore({
            autoload: true,
            filename: path.join(remote.app.getPath('userData'), `/${dbName}.db`)
        })), pool[dbName])
    }
}
