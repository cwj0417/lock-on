import dbs from '../../db'
import { log } from '../../util'

let dbConfig = dbs.get('config')
let dbBooks = dbs.get('books')
let dbScheme = dbs.get('scheme')
export default store => {
    log.info('config init...')
    // load theme
    dbConfig.find({
        type: 'theme'
    }, function (err, docs) {
        if (err || !docs.length || !docs[0].theme) {
            log.err('can not get theme', docs)
            let theme = store.state.theme
            dbConfig.update({
                type: 'theme'
            }, {
                type: 'theme',
                theme
            }, {
                upsert: true
            })
        } else {
            log.suc('got theme', docs[0].theme)
            store.commit('config/setTheme', docs[0].theme)
        }
    })
    log.info('books init...')
    // load books
    dbBooks.find({}, function (err, books) {
        if (err) {
            log.err('can not get books', err)
        } else {
            log.suc('got books', books)
            store.commit('books/set', books)
        }
    })
    // load schemes
    dbScheme.find({}, function (err, schemes) {
        if (err) {
            log.err('can not get scheme', err)
        } else {
            log.suc('got scheme', schemes)
            store.commit('schemes/set', schemes)
        }
    })
}
