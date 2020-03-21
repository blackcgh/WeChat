import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('components/common/login/Login')
const Register = () => import('components/common/login/Register')

const Welcome = () => import('views/welcome/Welcome')
const Chat = () => import('views/chat/Chat')
const Friend = () => import('views/friend/Friend')
const Find = () => import('views/find/Find')
const Profile = () => import('views/profile/Profile')

const Search = () => import('components/content/search/Search')
const Introduct = () => import('components/content/introduct/Introduct')
const AddFriend = () => import('components/content/introduct/AddFriend')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/welcome',
    component: Welcome,
    redirect: '/chat',
    children: [
      {
        path: '/chat',
        component: Chat
      },
      {
        path: '/friend',
        component: Friend
      },
      {
        path: '/find',
        component: Find
      },
      {
        path: '/profile',
        component: Profile
      },
      {
        path: '/search',
        component: Search
      },
      {
        path: '/introduct',
        component: Introduct
      },
      {
        path: '/add',
        component: AddFriend
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
