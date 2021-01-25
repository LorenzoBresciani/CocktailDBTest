import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DrinkDetails from '../components/DrinkDetails'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/drinkDetails/:drinkName',
    name: 'DrinkDetails',
    props: true,
    component: DrinkDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
})

export default router
