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
        return gist.$http({url: '/gists'})
        .then(res => {
            return res.data || res // 这里有重大bug, 因为gistore也用的axios, 在build环境下, voca的axios interceptor对gistore的产生了影响, 暂时只能这样处理了.
        }, err => {
            return Promise.reject(err)
        })
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
        }, err => err)
    },
    backup () {
        return appDb.getContent()
        .then(data => this.$api.backUp(data))
    },
    sync () {
        return this.$api.sync()
        .then(res => {
            return appDb.putContent(res)
        }, res => {
            // axios build环境拦截器的影响
            let ret = {}
            for (let name in res.files) {
                ret[name] = res.files[name].content
                try {
                    ret[name] = JSON.parse(ret[name])
                } catch (e) {}
            }
            return appDb.putContent(ret)
        })
    }
}
