import store from 'store'
export default {
  // 用户信息
  saveUser(user) {
    store.set('users', user)
  },

  getUser() {
    return store.get('users') || {}
  },

  removeUser() {
    store.remove('users')
  },
  // 成品出库数据
  saveList(data) {
    store.set('list', data)
  },

  getList() {
    return store.get('list') || {}
  },

  removeList() {
    store.remove('list')
  },
  // 成品入库数据
  saveLists(data) {
    store.set('lists', data)
  },

  getLists() {
    return store.get('lists') || {}
  },

  removeLists() {
    store.remove('lists')
  }
}