import dbs from '../../db'
import { log } from '../../util'

let db = dbs.get('config')
export default store => {
    log.info('config init...')
    // load theme
    db.find({
        type: 'theme'
    }, function (err, docs) {
        if (err || !docs.length || !docs[0].theme) {
            log.err('can not get theme', docs)
            let theme = store.state.theme
            db.update({
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
}
