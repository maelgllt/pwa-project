import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/camera',
    name: 'camera',
    component: () => import('../views/CameraView.vue'),
  },
  {
    path: '/location',
    name: 'location',
    component: () => import('../views/LocationView.vue'),
  },
  {
    path: '/phone',
    name: 'phone',
    component: () => import('../views/PhoneView.vue'),
  },
  {
    path: '/battery',
    name: 'battery',
    component: () => import('../views/BatteryView.vue'),
  },
  {
    path: '/web-otp',
    name: 'web-otp',
    component: () => import('../views/WebOTPView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
