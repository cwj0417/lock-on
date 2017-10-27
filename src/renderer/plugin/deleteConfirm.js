import { Modal } from 'iview'

export default {
    install (Vue) {
        Vue.prototype.$df = function (fn, name, ...args) {
            Modal.confirm({
                title: 'reminder',
                content: 'are you sure to delete this item?',
                onOk () {
                    fn && fn(...args)
                }
            })
        }
    }
}
