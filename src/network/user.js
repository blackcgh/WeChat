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

export {
  login,
  register
}
