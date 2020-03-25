import axios from './axios'

function getList(sendOne, receiveOne) {
  return axios({
    method: 'GET',
    url: '/chat/list',
    params: {
      sendOne,
      receiveOne
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
