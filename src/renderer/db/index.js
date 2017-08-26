import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'
import { assert } from '../util'

const collections = ['words']

let pool = {}

export default {
  get (dbName) {
    assert(collections.indexOf(dbName) > -1, 'collection not exists')
    return pool[dbName] || new Datastore({
      autoload: true,
      filename: path.join(remote.app.getPath('userData'), `/${dbName}.db`)
    })
  }
}
