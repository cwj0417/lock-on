import { remote } from 'electron'
const fs = require('fs')
const path = require('path')
let {app} = remote

let userDir = app.getPath('userData')

let content = fs.readFileSync(path.resolve(userDir, 'storage.json'))
try {
  content = JSON.parse(content)
} catch (e) {
  content = {}
}

let handle = null

export const storage = {
  put (content) {
    if (handle) {
      clearTimeout(handle)
    }
    handle = setTimeout(function () {
      fs.writeFileSync(path.resolve(userDir, 'storage.json'), JSON.stringify(content))
    }, 550)
  },
  fetch (module) {
    return content[module] ? content[module] : content
  }
}
