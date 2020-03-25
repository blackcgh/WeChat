import axios from './axios'

//封装具体请求路径
// 登录
function login(username, password) {
  return axios({
    method: 'POST',
    url: '/user/login',
    data: { username, password }
  })
}

// 注册
function register(username, password) {
  return axios({
    method: 'POST',
    url: '/user/register',
    data: { username, password }
  })
}

// 退出登录
function signOut(username) {
  return axios({
    method: 'POST',
    url: '/user/signout',
    data: { username }
  })
}

// 搜索用户
function search(keyword) {
  return axios({
    method: 'GET',
    url: '/user/search',
    params: { keyword }
  })
}

// 添加朋友
function add(obj, receiveOne) {
  return axios({
    method: 'POST',
    url: '/user/add',
    data: {
      obj,
      receiveOne
    }
  })
}

// 同意添加朋友
function agree(agreeObj, requestObj) {
  return axios({
    method: 'POST',
    url: '/user/agree',
    data: {
      agreeObj,
      requestObj
    }
  })
}

// 更改头像
function uploadAvatar(formdata) {
  return axios({
    method: 'POST',
    url: '/user/upload',
    data: formdata,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}

export {
  login,
  register,
  signOut,
  search,
  add,
  agree,
  uploadAvatar
}
