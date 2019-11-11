class Storage {
  addItem (key, value) {
    window.localStorage.setItem(key, value)
  }
  clearItem (key) {
    window.localStorage.removeItem(key)
  }
  getItem (key) {
    return window.localStorage.getItem(key)
  }
  clearAll () {
    window.localStorage.clear()
  }
}

module.exports = new Storage()
