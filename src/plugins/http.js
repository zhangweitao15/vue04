// 导入插件
import axios from 'axios';
const httpHelper = {};
// 配置vue插件
httpHelper.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  Vue.prototype.$http = axios;
};
export default httpHelper;
