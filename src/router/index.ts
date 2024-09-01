import { createWebHistory, createRouter } from 'vue-router';

import home from '../view/home/index.vue';
import animations from '../demo/animations/index.vue';
import ximalaya from '../view/ximalaya/index.vue';

const routes = [
  { path: '/home', name: 'home', component: home },
  { path: '/animations', name: 'animations', component: animations },
  { path: '/ximalaya', name: 'ximalaya', component: ximalaya },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
