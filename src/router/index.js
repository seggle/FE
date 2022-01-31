import { createRouter, createWebHistory } from 'vue-router'
import Class from '../views/Class.vue'
import ClassStudentManage from '../views/ClassStudentManage.vue'
import ClassExamManage from '../views/ClassExamManage.vue'
import Admin from '../views/Admin.vue'
import AdminAllProblems from '../views/AdminAllProblems.vue'
import AdminAnnouncment from '../views/AdminAnnouncement.vue'
import AdminFaq from '../views/AdminFaq.vue'
import AdminUserManagement from '../views/AdminUserManagement.vue'
import AdminAllClasses from '../views/AdminAllClasses.vue'

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
        component: AdminAllProblems
      },
      {
        path: 'all-classes',
        component: AdminAllClasses
      },
      {
        path: 'announcements',
        component: AdminAnnouncment
      },
      {
        path: 'faqs',
        component: AdminFaq
      },
      {
        path: 'user-management',
        component: AdminUserManagement
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
