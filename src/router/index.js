import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import BookList from '../components/BookList.vue';
import UserProfile from '../components/UserProfile.vue';
import Login from '../components/Login.vue';
import { useUserStore } from '../stores/userStore';


const routes = [
  { path: '/', component: Home },
  { path: '/books', component: BookList },
  { path: '/profile', component: UserProfile, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
