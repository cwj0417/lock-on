import origin from './i18n'
let cn = {}
let en = {}
let ja = {}
for (let [key, [_cn, _en, _ja]] of Object.entries(origin)) {
    cn[key] = _cn
    en[key] = _en
    ja[key] = _ja
}
export default {
    cn,
    en,
    ja
}
