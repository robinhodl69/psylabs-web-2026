/**
 * router/index.ts
 * 
 * Application Routing Configuration
 * Defines the desktop environment hierarchy and lazy-loads views.
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Desktop',
            component: () => import('../components/os/DesktopLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'DesktopHome',
                    component: () => import('../views/DesktopHome.vue'),
                },
                {
                    path: 'who-we-are',
                    name: 'WhoWeAre',
                    component: () => import('../views/WhoWeAre.vue'),
                },
                {
                    path: 'achievements',
                    name: 'Achievements',
                    component: () => import('../views/Achievements.vue'),
                },
                {
                    path: 'achievements/:id',
                    name: 'AchievementDetail',
                    component: () => import('../views/AchievementDetail.vue'),
                },
                {
                    path: 'portfolio',
                    name: 'Portfolio',
                    component: () => import('../views/Portfolio.vue'),
                },
                {
                    path: 'portfolio/:id',
                    name: 'PortfolioDetail',
                    component: () => import('../views/PortfolioDetail.vue'),
                },
                {
                    path: 'team',
                    name: 'Team',
                    component: () => import('../views/Team.vue'),
                },
                {
                    path: 'contact',
                    name: 'Contact',
                    component: () => import('../views/Contact.vue'),
                },
                {
                    path: 'terminal',
                    name: 'Terminal',
                    component: () => import('../views/TerminalView.vue'),
                },
                {
                    path: 'music',
                    name: 'Music',
                    component: () => import('../views/MusicView.vue'),
                },
                {
                    path: 'games',
                    name: 'Games',
                    component: () => import('../views/GamesView.vue'),
                }
            ]
        }
    ],
})

export default router
