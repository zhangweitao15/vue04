import Vue from 'vue';
import Router from 'vue-router';
// 引入登录页面路由组件组件
import Login from '@/views/login';
Vue.use(Router);
// 路由规则
export default new Router({
  routes: [
    {name: 'login', path: '/login', component: Login}
  ]
});
