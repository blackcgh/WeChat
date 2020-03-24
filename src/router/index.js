import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('components/common/login/Login')
const Register = () => import('components/common/login/Register')

const Welcome = () => import('views/welcome/Welcome')
const WeChat = () => import('views/wechat/WeChat')
const Friend = () => import('views/friend/Friend')
const Find = () => import('views/find/Find')
const Profile = () => import('views/profile/Profile')
const Chat = () => import('views/chat/Chat')

const Search = () => import('components/content/search/Search')
const Introduct = () => import('components/content/introduct/Introduct')
const AddFriend = () => import('components/content/introduct/AddFriend')

const Info = () => import('views/profile/childcomps/Info')
const Setting = () => import('views/profile/childcomps/Setting')
const Response = () => import('views/friend/childcomps/Response')

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
    redirect: '/wechat',
    children: [
      {
        path: '/wechat',
        component: WeChat
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
        component: Profile,
      },
      {
        path: '/chat',
        component: Chat
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
      },
      // profile子页面
      {
        path: '/info',
        component: Info
      },
      {
        path: '/setting',
        component: Setting
      },
      // friend子页面
      {
        path: '/response',
        component: Response
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 验证是否登录
router.beforeEach((to, form, next) => {
  if(to.path === '/login' || to.path === '/register') return next();
  sessionStorage.getItem('token') ? next() : next('/login');
})

export default router
