import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/Index.vue')
        },
        {
            path: '/favorite',
            name: 'favorite',
            component: () => import('@/pages/Favorite.vue')
        }
    ],
    scrollBehavior (to) {
        if (to.hash) {
            return
        }
        return {
            top: 0,
            behavior: 'smooth',
        }
    }
})

export default router;
