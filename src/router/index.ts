import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

import HomeView from '../views/index.vue';
import { localStorageHelper } from '@/utils/helper';
import { LOCAL_STORAGE_AUTH } from '@/utils/constants';

const routes: RouteRecordRaw[] = [
    // dashboard
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/dang-nhap',
        component: () => import('../views/login.vue'),
        name: 'login',
        meta: { layout: 'auth' },
    },
    {
        path: '/them-nhan-xet-bai-lam',
        component: () => import('../views/add-assignment-report.vue'),
        name: 'add-assignment-report',
        props: true,
    },
    {
        path: '/nhan-xet-bai-lam',
        component: () => import('../views/view-assignment-report.vue'),
        name: 'view-assignment-report',
        props: true,
    },
    {
        path: '/nhan-xet-bai-lam/:id',
        component: () => import('../views/view-assignment-report-detail.vue'),
        name: 'view-assignment-report-detail',
        props: true,
    },
    {
        path: '/nhan-xet-sau-buoi-hoc',
        component: () => import('../views/session-reports.vue'),
        name: 'session-reports',
        props: true,
    },
    {
        path: '/them-nhan-xet-bai-lam',
        component: () => import('../views/add-assignment-report.vue'),
        name: 'add-assignment-report',
        props: true,
    },
    // {
    //     path: '/them-nhan-xet-sau-buoi-hoc',
    //     component: () => import('../views/add-session-report.vue'),
    //     name: 'add-session-reports',
    //     props: true,
    // },
    {
        path: '/lessons/add',
        component: () => import('../views/add-lesson.vue'),
        name: 'add-lesson',
        props: true,
    },
    // {
    //     path: '/lessons',
    //     component: () => import('../views/lessons.vue'),
    //     name: 'lessons',
    //     props: true,
    // },
    {
        path: '/diem-danh',
        component: () => import('../views/attendances.vue'),
        name: 'attendances',
        props: true,
    },
    {
        path: '/hoc-sinh',
        component: () => import('../views/students.vue'),
        name: 'students',
        props: true,
    },
    {
        path: '/them-hoc-sinh',
        component: () => import('../views/add-student.vue'),
        name: 'add-student',
        props: true,
    },
    {
        path: '/hoc-sinh/:id', // Define a dynamic segment for the student ID
        component: () => import('../views/student-details.vue'), // Create a component for displaying student details
        name: 'student', // Give the route a name for easier navigation
        props: true, // Pass the ID as a prop to the component
    },
    {
        path: '/hoc-phi',
        component: () => import('../views/fees.vue'),
        name: 'fees',
        props: true,
    },
    {
        path: '/lessons/:id',
        component: () => import('../views/lessons.vue'), // Create a component for displaying student details
        name: 'lessons', // Give the route a name for easier navigation
        props: true, // Pass the ID as a prop to the component
    },
    {
        path: '/nhap-bang-file',
        component: () => import('../views/file-uploading.vue'), // Create a component for displaying student details
        name: 'file-uploading', // Give the route a name for easier navigation
        props: true, // Pass the ID as a prop to the component
    },
    {
        path: '/nhan-xet/:slug',
        component: () => import('../views/guest/reports.vue'),
        name: 'guest-reports',
        meta: { layout: 'auth',
            requiresAuth: false,
        },
    },
    {
        path: '/nguoi-dung',
        component: () => import('../views/users.vue'),
        name: 'users',
        props: true
    },
    
    // authentication
    {
        path: '/dang-nhap',
        name: 'boxed-signin',
        component: () => import(/* webpackChunkName: "auth-boxed-signin" */ '../views/auth/boxed-signin.vue'),
        meta: { layout: 'auth' },
    }

];

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    const store = useAppStore();

    if (to?.meta?.layout == 'auth') {
        store.setMainLayout('auth');
    } else {
        store.setMainLayout('app');
    }
    if (to.matched.some(route => route.meta.requiresAuth)) {
        if (!localStorageHelper.get(LOCAL_STORAGE_AUTH)) {
            next({ name: 'boxed-signin' })}
        next(true);
    }
    next(true);
});
router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});
export default router;
