import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Class from '../views/Class.vue'
import ClassStudentManage from '../views/ClassStudentManage.vue'
import ClassExamManage from '../views/ClassExamManage.vue'
import FAQ from '../views/FAQ.vue'

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/faq',
  name: 'FAQ',
  component: FAQ
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
    path: 'exam-manage',
    component: ClassExamManage
  }
  ]
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
