import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminLoginView from '../views/AdminLoginView.vue'
import SignupView from '../views/SignupView.vue'
import DashboardUserView from '../views/DashboardUserView.vue'
import DashboardAdminView from '../views/DashboardAdminView.vue'

import store from './store.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin/login',
      name: 'adminlogin',
      component: AdminLoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/dashboard',
      name: 'DashboardUserView',
      component: DashboardUserView,
      meta: { requiresAuth: true, requiredPermission: 'user' }
    },
    {
      path: '/admin/dashboard',
      name: 'DashboardAdminView',
      component: DashboardAdminView,
      meta: { requiresAuth: true, requiredPermission: 'admin' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const requiredPermission = to.meta.requiredPermission;

    if (store.state.user.role !== requiredPermission) {
      return next('/');
    }
  }

  next();
});

export default router
