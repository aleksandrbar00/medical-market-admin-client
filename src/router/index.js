import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminFeed from '../views/AdminFeed'
import Auth from '../views/Auth'
import store from '../store'
import CatalogView from "../views/CatalogView"
import BrandsView from "../views/BrandsView"
import CategoriesView from "../views/CategoriesView"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'feed',
    component: AdminFeed,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'catalog',
        component: CatalogView
      },
      {
        path: 'brands',
        component: BrandsView
      },
      {
        path: 'categories',
        component: CategoriesView
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    const token = window.localStorage.getItem('token')
    if(token){
      next()
    }else{
      next({
        path: '/auth'
      })
    }
  }else{
    next()
  }
})

export default router
