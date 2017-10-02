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
    }
}
const actions = {
    'books/search' ({commit}, {find = {}}) {
        //
    },
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
        //
    }
}
export default {
    state,
    mutations,
    actions
}
