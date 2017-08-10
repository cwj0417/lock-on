import { storage } from '../electron'
export default store => {
  store.subscribe((mutation, state) => {
    storage.put(state)
  })
}
