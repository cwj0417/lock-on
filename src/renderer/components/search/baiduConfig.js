// import md5 from 'md5'

export const langConfig = [
    {
        value: 'auto',
        label: 'auto'
    }, {
        value: 'zh',
        label: 'chinese'
    }, {
        value: 'en',
        label: 'english'
    }, {
        value: 'jp',
        label: 'japanese'
    }
]

// let appid = '20170817000074477'
// let appKey = 'mNtSRzKZzjIuZCCm0We4'
// let url = 'http://api.fanyi.baidu.com/api/trans/vip/translate'
// url = 'https://fanyi-api.baidu.com/api/trans/vip/translate'

export function getUrl (q, from, to, salt = Date.now()) {
    // let str = `${appid}${q}${salt}${appKey}`
    // let sign = md5(str)
    // return `${url}?q=${q}&from=${from}&to=${to}&appid=${appid}&salt=${salt}&sign=${sign}`
    return `http://fanyi.youdao.com/openapi.do?keyfrom=chromeextensions&key=1428418062&type=data&doctype=json&version=1.1&q=${q}`
}
