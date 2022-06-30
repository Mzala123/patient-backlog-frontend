import Vue from 'vue'
import VueRouter from 'vue-router'
import SideBar from '../components/SideBar.vue'
import registerView  from '../views/registerView.vue'
import LoginView from '@/views/LoginView.vue'

import AddPatient from '@/views/Home/AddPatient.vue'
import PatientList from '@/views/Home/PatientsList.vue'
import DashboardView from '@/views/Home/DashboardView.vue'
import UserList from '@/views/Home/UserList.vue'


Vue.use(VueRouter)


const routes = [
  {
    path: '/home',
    component: SideBar,
    children: [
      {
        path: '/add_patient',
        name: 'add-patient',
        component: AddPatient
      },
      {
        path: '/list_patient',
        name: 'patients-list',
        component: PatientList
      },
      {
        path: '/home_dashboard',
        name: 'home-dashboard',
        component: DashboardView
      },
      {
        path: '/users_list',
        name: 'users-list',
        component: UserList
      },

      // {
      //   path: '/about',
      //   name: 'about',
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
      //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      // },
    ]
  },
  
  {
    path:'/register',
    name: 'register',
    component: registerView
  },

  {
    path: '/',
    name: 'login',
    component: LoginView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
