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
import ClassContestList from '@/views/ClassContestList.vue'
import ClassContestListEdit from '@/views/ClassContestListEdit.vue'

import Login from '@/views/users/Login.vue'
import Register from '@/views/users/Register.vue'
import FindPassword from '@/views/users/FindPassword.vue'
import ResetPassword from '@/views/users/ResetPassword.vue'
import Resign from '@/views/Resign.vue'

import Home from '../views/Home.vue'
import User from '../views/User.vue'

import FAQ from '../views/FAQ.vue'
import Announcement from '../views/Announcement.vue'
import AnnouncementDetail from '../views/AnnouncementDetail.vue'
import Proposal from '../views/Proposal.vue'
import ProposalDetail from '../views/ProposalDetail.vue'
import ProposalCreate from '../views/ProposalCreate.vue'
import ExamSubmission from '../views/ExamSubmission.vue'

import GeneralList from '@/views/problem/GeneralList.vue'
import ClassList from '@/views/problem/ClassList.vue'
import EditClassList from '@/views/problem/EditClassList.vue'
import Problem from '@/views/problem/Problem.vue'
import CreateProblem from '@/views/problem/CreateProblem.vue'
import EditProblem from '@/views/problem/EditProblem.vue'

const requireAuth = () => (to, from, next) => {
  if (to.meta.isSuperAdmin && store.getters.isSuperAdmin) {
    return next()
  }
  alert('접근 권한이 없습니다.')
  next('/login')
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
  meta: { auth: true } // 로그인 권한이 필요한 페이지에 해당 태그를 작성하면 됩니다
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
  path: '/proposals',
  name: 'Proposal',
  component: Proposal
},
{
  path: '/proposals/:id',
  name: 'ProposalDetail',
  component: ProposalDetail
},
{
  path: '/proposals/create',
  name: 'ProposalCreate',
  component: ProposalCreate,
  meta: { auth: true } // 로그인 권한이 필요한 페이지에 해당 태그를 작성하면 됩니다
},
{
  path: '/test',
  name: ExamSubmission,
  component: ExamSubmission
},
{
  // 수업
  path: '/class/:classID',
  name: 'Class',
  component: Class,
  meta: { auth: true }, // 로그인 권한이 필요한 페이지에 해당 태그를 작성하면 됩니다
  children: [{
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
    component: ClassExamManage
  },
  {
    path: 'class-problem',
    name: 'ClassProblem',
    component: ClassProblem,
    meta: { isAdmin: true },
    children: [{
      path: ':contestID',
      name: 'ClassContestList',
      component: ClassContestList,
      meta: { isAdmin: true }
    },
    {
      path: ':contestID/edit-list',
      name: 'ClassContestListEdit',
      component: ClassContestListEdit,
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
  children: [{
    path: ':contestID/:contestProblemID',
    component: Problem
  }]
},
{
  path: '/:problemType/create-problem',
  name: 'CreateProblem',
  component: CreateProblem
  // meta: { isAdmin: true }
},
{
  path: '/:problemType/:problemID/edit-problem',
  name: 'EditProblem',
  component: EditProblem
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
