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
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
