import { createRouter, createWebHistory } from 'vue-router'
import Class from '../views/Class.vue'
import ClassStudentManage from '../views/ClassStudentManage.vue'
import ClassExamManage from '../views/ClassExamManage.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    // 수업
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
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
