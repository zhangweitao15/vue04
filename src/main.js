// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

// 引入插件
import elementUi from 'element-ui';
// 引入插件的css文件
import 'element-ui/lib/theme-chalk/index.css';

// 引入格式化时间模块
import moment from 'moment';

// 引入全局css文件
import '@/assets/css/index';
// 导入axios组件
import http from '@/plugins/http';
// 设置 过滤器 格式化日期格式
Vue.filter('fmtDate', (value, fmtStr) => {
  return moment(value).format(fmtStr);
});
// 注册 http组件
Vue.use(http);
// 注册element-ui插件
Vue.use(elementUi);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
