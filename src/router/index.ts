import { createWebHistory, createRouter } from 'vue-router';

import animations from '../demo/animations/index.vue';

const routes = [
  { path: '/home', name: 'home', component: animations },
  { path: '/animations', name: 'animations', component: animations },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
