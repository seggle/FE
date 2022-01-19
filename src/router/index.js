import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import Class from '@/views/Class.vue'
import ClassStudentManage from '@/views/ClassStudentManage.vue'
import ClassExamManage from '@/views/ClassExamManage.vue'

import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import FindPassword from '@/views/FindPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'

import Home from '../views/Home.vue'
import User from '../views/User.vue'

import FAQ from '../views/FAQ.vue'
import Announcement from '../views/Announcement.vue'

import Problem from '@/views/Problem.vue'

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/user',
  name: 'User',
  component: User
},
{
  path: '/faqs',
  name: 'FAQ',
  component: FAQ
},
{
  path: '/announcements',
  name: 'Announcement',
  component: Announcement
},
{
  path: '/class',
  name: 'Class',
  component: Class,
  children: [{
    path: 'student-manage',
    component: ClassStudentManage
  },
  {
    // 수업
    path: '/class',
    name: 'Class',
    component: Class,
    meta: { auth: true }, // 권한이 필요한 페이지에 해당 태그를 작성하면 됩니다
    children: [
      {
        path: 'student-manage',
        component: ClassStudentManage
      },
      {
        path: 'exam-manage',
        component: ClassExamManage
      }
    ]
  }
  ]
},
{
  path: '/login',
  name: 'Login',
  component: Login
},
{
  path: '/register',
  name: 'Register',
  component: Register
},
{
  path: '/find-password',
  name: 'FindPassword',
  component: FindPassword
},
{
  path: '/reset-password',
  name: 'ResetPassword',
  component: ResetPassword
},
{
  path: '/problem',
  name: 'Problem',
  component: Problem
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    console.log('인증이 필요합니다')
    next('/login')
    return
  }
  next()
})

export default router
