import dbs from '../../db'

let db = dbs.get('scheme')

const state = {
    schemes: []
}
const mutations = {
    'schemes/set' (state, schemes) {
        state.schemes = schemes
    },
    'schemes/add' (state, scheme) {
        state.schemes.unshift(scheme)
    },
    'schemes/remove' (state, id) {
        state.schemes.splice(state.schemes.findIndex(({_id}) => _id === id), 1)
    }
}
const actions = {
    'schemes/post' ({commit}, scheme) {
        return new Promise((resolve, reject) => {
            db.insert({
                ...scheme,
                createTime: new Date()
            }, function (err, newDocs) {
                if (err) {
                    reject(err)
                } else {
                    commit('schemes/add', newDocs)
                    resolve(newDocs)
                }
            })
        })
    },
    'schemes/remove' ({commit}, {_id}) {
        return new Promise((resolve, reject) => {
            db.remove({_id}, {}, function (err, num) {
                if (err) {
                    reject(err)
                } else {
                    commit('schemes/remove', _id)
                    resolve()
                }
            })
        })
    }
}
export default {
    state,
    mutations,
    actions
}
