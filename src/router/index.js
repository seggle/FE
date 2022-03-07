import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import Admin from '@/views/admin/Admin.vue'
import AdminAllProblems from '@/views/admin/AdminAllProblems.vue'
import AdminAnnouncment from '@/views/admin/AdminAnnouncement.vue'
import AdminFaq from '@/views/admin/AdminFaq.vue'
import AdminUserManagement from '@/views/admin/AdminUserManagement.vue'
import AdminAllClasses from '@/views/admin/AdminAllClasses.vue'

import Class from '@/views/class/Class.vue'
import ClassAllProblem from '@/views/class/ClassAllProblem.vue'
import ClassStudentManage from '@/views/class/ClassStudentManage.vue'
import ClassExamManage from '@/views/class/ClassExamManage.vue'
import ClassContest from '@/views/class/ClassContest.vue'
import ClassContestProblemList from '@/views/class/ClassContestProblemList.vue'
import ClassContestProblemListEdit from '@/views/class/ClassContestProblemListEdit.vue'
import ClassList from '@/views/class/ClassList.vue'
import EditClassList from '@/views/class/EditClassList.vue'

import Login from '@/views/users/Login.vue'
import Register from '@/views/users/Register.vue'
import FindPassword from '@/views/users/FindPassword.vue'
import ResetPassword from '@/views/users/ResetPassword.vue'
import Resign from '@/views/users/Resign.vue'
import User from '@/views/users/User.vue'

import Home from '@/views/general/Home.vue'
import FAQ from '@/views/general/FAQ.vue'
import Announcement from '@/views/general/Announcement.vue'
import AnnouncementDetail from '@/views/general/AnnouncementDetail.vue'
import Board from '@/views/general/Board.vue'
import BoardDetail from '@/views/general/BoardDetail.vue'
import BoardCreate from '@/views/general/BoardCreate.vue'

import CompetitionList from '@/views/competition/CompetitionList.vue'

import Problem from '@/views/problem/Problem.vue'
import CreateProblem from '@/views/problem/CreateProblem.vue'
import EditProblem from '@/views/problem/EditProblem.vue'

import api from '@/api/index.js'

const requireAuth = () => (to, from, next) => {
  if (to.meta.isSuperAdmin && store.getters.isSuperAdmin) {
    return next()
  }
  alert('접근 권한이 없습니다.')
  next('/login')
}

const requireAdminAuth = () => (to, from, next) => {
  if (to.meta.isAdmin && store.getters.isAdmin) {
    return next()
  }
  alert('접근 권한이 없습니다.')
  next('/login')
}

const requireClassAuth = () => async (to, from, next) => {
  try {
    console.log(to.params.classID)
    const res = await api.getClassUserList(to.params.classID)
    const classList = res.data
    for (let i = 0; i < classList.length; i++) {
      if (classList[i].username === store.state.userid) {
        return next()
      }
    }
    alert('접근 권한이 없습니다.')
    next('/')
  } catch (err) {
    console.log(err)
  }
}

const requireClassAdminAuth = () => async (to, from, next) => {
  try {
    const res = await api.getClassUserList(to.params.classID)
    const classList = res.data
    console.log(classList)
    for (let i = 0; i < classList.length; i++) {
      if (
        classList[i].username === store.state.userid &&
                classList[i].privilege > 0
      ) {
        return next()
      }
    }
    alert('접근 권한이 없습니다.')
    next(`/class/${to.params.classID}`)
  } catch (err) {
    console.log(err)
  }
}

const requireCompetitionAdminAuth = () => async (to, from, next) => {
  try {
    let res
    if (to.params.problemType === 'general') {
      res = await api.getCompetitionTAList(to.params.problemID)
      const competitionList = res.data

      for (let i = 0; i < competitionList.length; i++) {
        if (
          competitionList[i].username === store.state.userid &&
                    competitionList[i].privilege > 0
        ) {
          return next()
        }
      }
      alert('접근 권한이 없습니다.')
      next('/')
    } else {
      return next()
    }
  } catch (err) {
    console.log(err)
  }
}

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/users',
  name: 'User',
  component: User,
  meta: { auth: true }
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
  path: '/announcements/:id',
  name: 'AnnouncementDetail',
  component: AnnouncementDetail
},
{
  path: '/board',
  name: 'Board',
  component: Board
},
{
  path: '/board/:id',
  name: 'BoardDetail',
  component: BoardDetail
},
{
  path: '/board/:mode',
  name: 'BoardCreate',
  component: BoardCreate,
  meta: { auth: true }
},
{
  // 수업
  path: '/class/:classID',
  name: 'Class',
  beforeEnter: requireClassAuth(),
  component: Class,
  meta: { auth: true },
  children: [{
    path: 'all-problems',
    name: 'ClassAllProblem',
    component: ClassAllProblem,
    beforeEnter: requireClassAdminAuth()
  },
  {
    path: 'student-manage',
    name: 'ClassStudentManage',
    component: ClassStudentManage,
    meta: { isAdmin: true },
    beforeEnter: requireClassAdminAuth()
  },
  {
    path: 'exam-manage/:contestID',
    name: 'ClassExamManage',
    component: ClassExamManage,
    meta: { isAdmin: true },
    beforeEnter: requireClassAdminAuth()
  },
  {
    path: 'class-contest',
    name: 'ClassContest',
    component: ClassContest,
    meta: { isAdmin: true },
    children: [{
      path: ':contestID',
      name: 'ClassContestProblemList',
      component: ClassContestProblemList,
      meta: { isAdmin: true }
    },
    {
      path: ':contestID/edit-list',
      name: 'ClassContestProblemListEdit',
      component: ClassContestProblemListEdit,
      meta: { isAdmin: true }
    }
    ]
  }
  ]
},
{
  path: '/admin',
  name: 'Admin',
  component: Admin,
  meta: { isSuperAdmin: true },
  beforeEnter: requireAuth(),
  children: [{
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
  path: '/resign',
  name: 'Resign',
  component: Resign
},
{
  path: '/problem/competition',
  name: 'CompetitionList',
  component: CompetitionList
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
  children: [{
    path: ':contestID/:contestProblemID',
    component: Problem
  }]
},
{
  path: '/:problemType/create-problem',
  name: 'CreateProblem',
  component: CreateProblem,
  meta: { isAdmin: true },
  beforeEnter: requireAdminAuth()
},
{
  path: '/:problemType/:problemID/edit-problem',
  name: 'EditProblem',
  component: EditProblem,
  beforeEnter: requireCompetitionAdminAuth()
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (store.state.accessToken === '' && store.state.refreshToken !== '') {
    await store.dispatch('refreshAccessToken')
  }
  if (store.state.accessToken !== '') {
    return next()
  }
  if (to.meta.auth && !store.getters.isLogin) {
    alert('로그인이 필요합니다')
    next({ name: 'Login' })
  } else if (to.meta.isAdmin && !store.getters.isAdmin) {
    alert('잘못된 접근입니다')
    next({ name: 'NotFound' })
  } else next()
})

export default router
