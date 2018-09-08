// 导入插件
import axios from 'axios';
import {Loading} from 'element-ui';
const httpHelper = {};
// 配置vue插件
httpHelper.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  // 定义loading 实现页面加载效果
  let loadingIntance = null;
  // 添加请求拦截器 在拦截器中设置请求头token简化代码
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 在请求发送之前，添加请求头token
    // 添加请求头之前先判断 地址是不是/login
    if (config.url !== 'login') {
      // 将token 从session.getitem 取出
      const token = sessionStorage.getItem('token');
      // 设置请求头
      config.headers.Authorization = token;
    }
    loadingIntance = Loading.service();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // 添加响应拦截器 处理加载提示
  axios.interceptors.response.use(function (response) {
    // 响应结束后关闭loding
    loadingIntance.close();
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
  // 将axios 组件添加到vue对象中
  Vue.prototype.$http = axios;
};
export default httpHelper;
