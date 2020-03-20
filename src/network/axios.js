import originAxios from 'axios'

// 封装网络请求函数
function axios(config) {
  originAxios.defaults.baseURL = '/api';
  originAxios.defaults.timeout = 5000;

  return originAxios(config)
}

export default axios
