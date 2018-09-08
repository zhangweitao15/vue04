import Vue from 'vue';
import Router from 'vue-router';
// 引入登录页面路由组件组件
import Login from '@/views/login';
import Home from '@/views/home';
import Users from '@/views/users/List';
// 导入 角色列表组件
import Rights from '@/views/rights/Rights';
// 导入 权限列表组件
import Roles from '@/views/rights/Roles';
// 首先引入elemenui中的消息模块
import { Message } from 'element-ui';

Vue.use(Router);

// 路由规则 将路由规则储存在变量中 方便操作
const router = new Router({
  routes: [
    {name: 'login', path: '/login', component: Login},
    { name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: 'users',
          component: Users
        },
        {
          name: 'rights',
          path: 'rights',
          component: Rights
        },
        {
          name: 'roles',
          path: 'roles',
          component: Roles
        }

      ]}
  ]
});
// 设置路由的前置守卫， 路由在跳转之前
router.beforeEach((to, from, next) => {
  // 判断有没有token 排除首页
  if (to.name === 'login') {
    // 满足条件 是登陆页代码向下执行
    next();
  } else {
    // 不是首页，判断有没有token
    const token = sessionStorage.getItem('token');
    if (token) {
      // 有代码继续执行
      next();
    } else {
      // 没有token 跳转到登录页，并提示
      // 因为位置的原因， 这里的this指向不是vue所以...
      router.push('/login');
      // 提示登录
      // 这里的this指向也有问题， 将elment-ui中的message组件引入，
      // 直接是有引入的部分组件进行提示
      Message.warning('请先登录');
    }
  }
});
// 将处理好的路由规则输出
export default router;