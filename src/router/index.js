import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/Layout';
import Login from '@/views/login/Login';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Layout,
    children: [
      {
        path: 'daily',
        name: 'daily',
        component: () => import(/* webpackChunkName: "note" */ '@/views/daily/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

const OPEN_URL = ['/login'];

router.beforeEach((to, from, next) => {
  const infoStr = sessionStorage.getItem('account_info');
  if ((!infoStr && OPEN_URL.some(item => item === to.path)) || infoStr) {
    next();
    return;
  }

  next({
    path: '/login',
    query: {
      backUrl: to.fullPath
    }
  });
});

export default router;
