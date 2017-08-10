import { storage } from '../electron'
let stateStructure = {
  words: []
}
let state = {}
let data = storage.fetch('words')
for (let [key, value] of Object.entries(stateStructure)) {
  state[key] = data[key] || value
}
const mutations = {
  [`words/add`] (state, word) {
    // must check words type here. write an assert lib
    state.words.push(word)
  }
}
const actions = {
  //
}
export default {
  state,
  mutations,
  actions
}
