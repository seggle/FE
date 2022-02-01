import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import Admin from '../views/Admin.vue'
import AdminAllProblems from '../views/AdminAllProblems.vue'
import AdminAnnouncment from '../views/AdminAnnouncement.vue'
import AdminFaq from '../views/AdminFaq.vue'
import AdminUserManagement from '../views/AdminUserManagement.vue'
import AdminAllClasses from '../views/AdminAllClasses.vue'

import Class from '@/views/Class.vue'
import ClassAllProblem from '@/views/ClassAllProblem.vue'
import ClassStudentManage from '@/views/ClassStudentManage.vue'
import ClassExamManage from '@/views/ClassExamManage.vue'
import ClassProblem from '@/views/ClassProblem.vue'

import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import FindPassword from '@/views/FindPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'

import Home from '../views/Home.vue'
import User from '../views/User.vue'

import FAQ from '../views/FAQ.vue'
import Announcement from '../views/Announcement.vue'

import GeneralList from '@/views/problem/GeneralList.vue'
import ClassList from '@/views/problem/ClassList.vue'
import EditClassList from '@/views/problem/EditClassList.vue'
import Problem from '@/views/problem/Problem.vue'
import CreateProblem from '@/views/problem/CreateProblem.vue'

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
  // 수업
  path: '/class/:classID',
  name: 'Class',
  component: Class,
  meta: { auth: true }, // 로그인 권한이 필요한 페이지에 해당 태그를 작성하면 됩니다
  children: [
    {
      path: 'all-problems',
      name: 'ClassAllProblem',
      component: ClassAllProblem
    },
    {
      path: 'student-manage',
      name: 'ClassStudentManage',
      component: ClassStudentManage,
      meta: { isAdmin: true } // 교수, superadmin의 권한이 필요한 페이지에 작성하면 됩니다
    },
    {
      path: 'exam-manage',
      name: 'ClassExamManage',
      component: ClassExamManage,
      meta: { isAdmin: true }
    },
    {
      path: 'class-problem',
      name: 'ClassProblem',
      component: ClassProblem
    }
  ]
},
{
  path: '/admin',
  name: 'Admin',
  component: Admin,
  meta: { isSuperAdmin: true },
  children: [
    {
      path: 'all-problems',
      component: AdminAllProblems,
      meta: { isSuperAdmin: true }
    },
    {
      path: 'all-classes',
      component: AdminAllClasses,
      meta: { isSuperAdmin: true }
    },
    {
      path: 'announcements',
      component: AdminAnnouncment,
      meta: { isSuperAdmin: true }
    },
    {
      path: 'faqs',
      component: AdminFaq,
      meta: { isSuperAdmin: true }
    },
    {
      path: 'user-management',
      component: AdminUserManagement,
      meta: { isSuperAdmin: true }
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
  path: '/problem/general',
  name: 'GeneralList',
  component: GeneralList
},
{
  path: '/problem/class',
  name: 'ClassList',
  component: ClassList
},
{
  path: '/problem/edit-class',
  name: 'EditClassList',
  component: EditClassList
},
{
  path: '/problem/:problemType/:problemID',
  name: 'Problem',
  component: Problem,
  meta: { auth: true },
  children: [
    {
      path: ':contestID/:contestProblemID',
      component: Problem
    }
  ]
},
{
  path: '/:problemType/create-problem',
  name: 'CreateProblem',
  component: CreateProblem
  // meta: { isAdmin: true }
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    alert('로그인이 필요합니다')
    next({ name: 'Login' })
  } else if (to.meta.isAdmin && !store.getters.isAdmin) {
    alert('잘못된 접근입니다')
    next({ name: 'NotFound' })
  } else next()
})

export default router
