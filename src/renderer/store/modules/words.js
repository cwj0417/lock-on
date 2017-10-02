import dbs from '../../db'
import { log } from '../../util'

let db = dbs.get('words')

const state = {
    words: []
}
const mutations = {
    'words/set' (state, words) {
        state.words = words
    },
    'words/add' (state, word) {
        // must check words type here. write an assert lib
        state.words.push(word)
    },
    'words/update' (state, {word, field, value}) {
        word[field] = value
    }
}
const actions = {
    'words/post' ({commit}, word) {
        return new Promise((resolve, reject) => {
            db.insert(word, function (err, newDocs) {
                if (err) {
                    reject(err)
                } else {
                    resolve(newDocs)
                }
            })
        })
    },
    'words/search' ({commit}, {find = {}, sort = {}, skip = 0, limit = 0}) {
        log.info('searching...', arguments[1])
        return new Promise((resolve, reject) => {
            db
            .find(find)
            .skip(skip)
            .sort(sort)
            .limit(limit)
            .exec(function (err, docs) {
                if (err) {
                    log.err('something went wrong...', err)
                    reject(err)
                } else {
                    log.suc('succeed...', docs)
                    commit('words/set', docs)
                    db.update({
                        _id: {
                            $in: docs.map(_ => _._id)
                        }
                    }, {$inc: {finded: 1}}, {multi: true})
                    db.update({}, {$addToSet: {like: true}}, {multi: true})
                    resolve(docs)
                }
            })
        })
    },
    'words/count' ({commit}, {find}) {
        return new Promise((resolve, reject) => {
            db
            .count(find, function (err, count) {
                if (err) {
                    reject(err)
                } else {
                    resolve(count)
                }
            })
        })
    },
    'words/toggleLike' ({commit}, word) {
        let {_id, like} = word
        return new Promise((resolve, reject) => {
            db
            .update({
                _id
            }, {
                $set: {
                    like: !like
                }
            }, {}, function (err) {
                if (err) {
                    reject(err)
                } else {
                    commit('words/update', {word, field: 'like', value: !like})
                    resolve()
                }
            })
        })
    },
    'words/update' ({commit}, {word, field, value}) {
        return new Promise((resolve, reject) => {
            db
            .update({
                _id: word._id
            }, {
                $set: {
                    [field]: value
                }
            }, {}, function (err) {
                if (err) {
                    reject(err)
                } else {
                    commit('words/update', {word, field, value})
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
