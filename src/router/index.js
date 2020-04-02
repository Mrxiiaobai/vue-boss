import Vue from 'vue'
import Router from 'vue-router'

//只需要在这里注册路由就好了，其他的逻辑不用管
let functions = ['company','message','user','chat','selectType']

const login = () => ({
  component: import( /* webpackChunkName: "login" */ '@/components/pages/login'),
  loading: null,
  error: null,
})

const index = () => ({
  component: import( /* webpackChunkName: "login" */ '@/components/pages/index'),
  loading: null,
  error: null,
})

const identifyCode = () => ({
  component: import( /* webpackChunkName: "login" */ '@/components/pages/identifyCode'),
  loading: null,
  error: null,
})

const passLogin = () => ({
  component: import( /* webpackChunkName: "login" */ '@/components/pages/passLogin'),
  loading: null,
  error: null,
})

let constructor = [{
  path: '/',
  name: 'login',
  component: login,
  meta: {
    keepAlive: true
  }
},
{
  path: '/index',
  name: 'index',
  component: index,
  meta: {
    keepAlive: true
  }
},{
  path: '/identifyCode',
  name: 'identifyCode',
  component: identifyCode,
  meta: {
    keepAlive: true
  }
},{
  path: '/passLogin',
  name: 'passLogin',
  component: passLogin,
  meta: {
    keepAlive: true
  }
}]

let routers = functions.map((item) => {
  return {
    path: `/${item}`,
    name: item,
    component: () => ({
      component: import(`@/components/functions/${item}`),
      loading: null,
      error: null,
      delay: 200,
    }),
  }
})

let config = constructor.concat(routers)



Vue.use(Router)

export default new Router({
  routes: config
})
