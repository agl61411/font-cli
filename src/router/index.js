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
        path: 'note',
        name: 'note',
        component: () => import(/* webpackChunkName: "note" */ '@/views/note/Note.vue')
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
  const infoStr = sessionStorage.getItem('info');

  if ((!infoStr && OPEN_URL.some(item => item === to.url)) || infoStr) {
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
