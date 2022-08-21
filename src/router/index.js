import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
//import UserList from '../views/UseList.vue'
import ChatBoard from '../views/ChatBoard.vue'
//import ChatBox from '../views/ChatBox.vue'
import LogIn from "../views/LogIn.vue"
import SignUp from "../views/SignUp.vue"
import Welcome from "../views/WelcomePage.vue"
import RoomList from "../views/RoomList.vue"
//import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.use(VueRouter)

const routes = [
  /*{
    path: '/',
    name: 'home',
    component: HomeView
  },*/
  {
    path: '/chatboard',
    name: 'ChatBoard',
    component: ChatBoard,
    meta: { requiresAuth: true }
  },
  //{
  //path: '/about',
  //name: 'about',
  //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //},
  /*{
    path: '/',
    name: 'UserList',
    component: UserList,
    meta: { requiresAuth: true }
  },*/
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'RoomList',
    component: RoomList,
    meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    const user = sessionStorage.getItem('user');
    console.log(JSON.parse(user));
    if (!user) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next();
    } }
  else {
    next();
  }
});

    // const auth = getAuth();
    //onAuthStateChanged(auth, (user) => {

    //})
 


export default router
