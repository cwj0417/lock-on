export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}
export const log = {
  suc: (_, ...args) => {
    console.log(`%c ${_}`, 'color: #86d850;font-size:15px;font-weight:bold;', ...args)
  },
  info: (_, ...args) => {
    console.log(`%c ${_}`, 'color: #27a8f2;font-size:15px;font-weight:bold;', ...args)
  },
  err: (_, ...args) => {
    console.log(`%c ${_}`, 'color: red;font-size:15px;font-weight:bold;', ...args)
  }
}
