import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateEvent from '../components/Events/CreateEvent.vue'
import Login from '../components/Auth/Login.vue'
import Register from '../components/Auth/Register.vue'
import EventsList from '../components/Events/EventsList.vue'
import MyEvents from '../components/Events/MyEvents.vue'
import EventDetails from '../components/Events/EventDetails.vue'
import isAuth from '../store/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: { name: 'Login' }
  },
  {
    path: '/create-event',
    name: 'CreateEvent',
    component: CreateEvent
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresHeader: true }
  },
  {
    path: '/events-list',
    name: 'EventsList',
    component: EventsList
  },
  {
    path: '/my-events',
    name: 'MyEvents',
    component: MyEvents
  },
  {
    path: '/event-details/:id?',
    props: true,
    name: 'EventDetails',
    component: EventDetails
  },
  {
    path: '/locations',
    name: 'locations',
    component: () => import('../views/Locations')
  },
  {
    path: '/card-location/:id',
    name: 'card-location',
    props: true,
    component: () => import('../views/CardLocation')
  },
  {
    path: '/profile',
    name: 'Profile',
    props: true,
    component: () => import('../views/Profile')
  },
  {
    path: '/my-locations',
    name: 'My-Locations',
    props: true,
    component: () => import('../components/MyLocations')
  },
  {
    path: '*',
    name: 'Error',
    props: true,
    component: () => import('../components/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name !== 'Register' && !isAuth.state.isAuth) { // eslint-disable-line
    next({ name: 'Login' })
  } else next()
  if (isAuth.state.isAuth && to.name === 'Login' || isAuth.state.isAuth && to.name === 'Register') { // eslint-disable-line
    next({ name: 'EventsList' })
  } else next()
})

export default router
