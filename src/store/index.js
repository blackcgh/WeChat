import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // 登录后保存的用户数据
  userData: {
    '_id': '',
    username: '',
    avatar: '',
    friend: [],
    request: []
  },
  // 正在聊天
  chating: []
}
const mutations = {
  // 记录登录用户
  record(state, userData) {
    state.userData = userData
  },
  // 添加朋友
  addFriend(state, requestObj) {
    state.userData.friend.push(requestObj)
  },
  // 删除某一个添加请求
  removeOne(state, index) {
    state.userData.request.splice(index, 1)
  },
  // 添加聊天者
  add(state, obj) {
    if (obj instanceof Array) {
      state.chating.push(...obj)
    } else {
      // 将当前聊天置顶
      for (let i in state.chating) {
        // 将原本聊天删除
        if (state.chating[i].index == obj.index) {
          state.chating.splice(i, 1)
          break;
        }
      }
      state.chating.unshift(obj)
    }
  },
  // 退出登录，清空用户信息
  clear(state) {
    state.userData = {
      username: '',
      avatar: '',
      friend: [],
      request: []
    },
    state.chating = []
  },
  // 上传头像
  upload(state) {
    const r = Math.random().toString().substr(2, 4);
    state.userData.avatar = 'http://192.168.1.8/images/' + state.userData['_id'] + '?t=' + r;
  }
}

const store = new Vuex.Store({
  state,
  mutations,
})

export default store
