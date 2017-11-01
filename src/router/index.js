import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Obras from '@/components/Obra/Obras'
import CreateObra from '@/components/Obra/CreateObra'
import Publicaciones from '@/components/Publicacion/Publicaciones'
import CreatePublicacion from '@/components/Publicacion/CreatePublicacion'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Obra from '@/components/Obra/Obra'
import Publicacion from '@/components/Publicacion/Publicacion'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/obras',
      name: 'Obras',
      component: Obras
    },
    {
      path: '/obra/new',
      name: 'CreateObra',
      component: CreateObra,
      beforeEnter: AuthGuard
    },
    {
      path: '/obras/:id',
      name: 'Obra',
      props: true,
      component: Obra
    },
    {
      path: '/publicaciones',
      name: 'Publicaciones',
      component: Publicaciones
    },
    {
      path: '/publicacion/new',
      name: 'CreatePublicacion',
      component: CreatePublicacion,
      beforeEnter: AuthGuard
    },
    {
      path: '/publicaciones/:id',
      name: 'publicacion',
      props: true,
      component: Publicacion
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
})
