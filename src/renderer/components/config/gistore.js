import gist from 'gistore'
import { sysConfig, appDb } from '../../db'

export default {
    $api: gist,
    check () {
        return new Promise(resolve => {
            sysConfig.get()
            .then(res => {
                if (res.token) {
                    gist.setToken(res.token)
                }
                if (res.id) {
                    gist.setId(res.id)
                }
                resolve(res)
            })
        })
    },
    setToken (token) {
        gist.setToken(token)
        return gist.getList()
    },
    saveToken (token) {
        return sysConfig.get()
        .then(res => {
            res = res || {}
            res.token = token
            return sysConfig.set(res)
        })
    },
    createGist (desc) {
        return appDb.getContent()
        .then(data => gist.createGist(desc, data))
        .then(res => {
            let id = res.id
            sysConfig.get()
            .then(res => {
                res = res || {}
                res.id = id
                return sysConfig.set(res)
            })
        }, err => Promise.reject(err))
    },
    backup () {
        return appDb.getContent()
        .then(data => this.$api.backUp(data))
    },
    sync () {
        return this.$api.sync()
        .then(res => {
            return appDb.putContent(res)
        })
    }
}
