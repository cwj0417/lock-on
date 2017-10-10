import dbs from '../../db'
import { log } from '../../util'

let db = dbs.get('config')

const state = {
    theme: 'original'
}

const mutations = {
    'config/setTheme' (state, theme) {
        state.theme = theme
    }
}

const actions = {
    'config/setTheme' ({commit}, theme) {
        log.info('set theme', theme)
        commit('config/setTheme', theme)
        commit('ipc/theme', theme)
        db.update({
            type: 'theme'
        }, {
            type: 'theme',
            theme
        })
    },
    'config/changeLang' ({commit}, lang) {
        log.info('change language', lang)
        commit('ipc/lang', lang)
        db.update({
            type: 'lang'
        }, {
            type: 'lang',
            lang
        }, {
            upsert: true
        })
    }
}

export default {
    state,
    mutations,
    actions
}
