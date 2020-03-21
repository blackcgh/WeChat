import originAxios from 'axios'

// 封装网络请求函数
function axios(config) {
  originAxios.defaults.baseURL = '/api';
  originAxios.defaults.timeout = 5000;

  // 请求拦截，发送token
  originAxios.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token');
    if(token) {
      config.headers.Authorization = token;
    }
    return config
  })

  // 响应拦截，查看token是否过期

  return originAxios(config)
}

export default axios
