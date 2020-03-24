import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // 登录后保存的用户数据
  userData: {
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
  addFriend(state, requestOne) {
    state.userData.friend.push(requestOne)
  },
  // 删除某一个添加请求
  removeOne(state, index) {
    state.userData.request.splice(index, 1)
  },
  // 添加聊天者
  add(state, chat) {
    // 将当前聊天置顶
    for(let i in state.chating) {
      // 将原本聊天删除
      if(state.chating[i].receiveOne === chat.receiveOne) {
        state.chating.splice(i, 1)
        break;
      }
    }
    state.chating.unshift(chat)
  },
  // 退出登录，清空用户信息
  clear(state) {
    state.userData = {
      username: '',
      avatar: '',
      friend: [],
      request: []
    }
  }
}

const store = new Vuex.Store({
  state,
  mutations,
})

export default store
