import { createRouter, createWebHistory } from 'vue-router'
import Class from '../views/Class.vue'
import ClassStudentManage from '../views/ClassStudentManage.vue'
import ClassExamManage from '../views/ClassExamManage.vue'
import Admin from '../views/Admin.vue'
import AllProblems from '../views/AdminAllProblems.vue'
import Announcment from '../views/AdminAnnouncement.vue'
import Faq from '../views/AdminFaq.vue'
import UserManagement from '../views/AdminUserManagement.vue'

const routes = [
  {
    path: '/class',
    name: 'Class',
    component: Class,
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
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: 'all-problems',
        component: AllProblems
      },
      {
        path: 'announcements',
        component: Announcment
      },
      {
        path: 'faqs',
        component: Faq
      },
      {
        path: 'user-management',
        component: UserManagement
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
