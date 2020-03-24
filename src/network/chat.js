import axios from './axios'

function getList(me, other) {
  return axios({
    method: 'GET',
    url: '/chat/list',
    params: {
      me,
      other
    }
  })
}

function newChat(chat) {
  return axios({
    method: 'POST',
    url: '/chat/new',
    data: chat
  })
}

export {
  getList,
  newChat
}
