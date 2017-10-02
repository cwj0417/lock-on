import dbs from '../../db'

let db = dbs.get('books')

const state = {
    books: []
}
const mutations = {
    'books/set' (state, books) {
        state.books = books
    },
    'books/add' (state, book) {
        state.books.unshift(book)
    },
    'books/remove' (state, id) {
        state.books.splice(state.books.findIndex(({_id}) => _id === id), 1)
    },
    'books/addWord' (state, {book, word}) {
        state.books.find(({_id}) => _id === book).list.push(word)
    }
}
const actions = {
    'books/post' ({commit}, name) {
        if (name.trim() === '') return Promise.reject(new Error())
        return new Promise((resolve, reject) => {
            db.insert({
                name,
                createTime: new Date(),
                list: []
            }, function (err, newDocs) {
                if (err) {
                    reject(err)
                } else {
                    commit('books/add', newDocs)
                    resolve(newDocs)
                }
            })
        })
    },
    'books/remove' ({commit}, {_id}) {
        return new Promise((resolve, reject) => {
            db.remove({_id}, {}, function (err, num) {
                if (err) {
                    reject(err)
                } else {
                    commit('books/remove', _id)
                    resolve()
                }
            })
        })
    },
    'books/addWord' ({commit}, {book, word}) {
        return new Promise((resolve, reject) => {
            db.find({
                _id: book
            }, function (err, item) {
                if (err) {
                    reject(new Error('an error occurred'))
                    return
                }
                let {list} = item[0]
                if (list.indexOf(word) > -1) {
                    resolve('existed')
                    return
                }
                db.update({
                    _id: book
                }, {
                    $push: {
                        list: word
                    }
                }, {}, function (err) {
                    if (!err) {
                        commit('books/addWord', {book, word})
                        resolve()
                    }
                })
            })
        })
    }
}
export default {
    state,
    mutations,
    actions
}
