// import { Modal } from 'iview'

export default {
    install (Vue) {
        Vue.prototype.$df = function (fn, name, ...args) {
            fn && fn(...args)
            // Modal.confirm({
            //     render: (h) => h('input'),
            //     onOk () {
            //         // fn && fn(...args)
            //         console.log('ok')
            //     }
            // })
        }
    }
}
