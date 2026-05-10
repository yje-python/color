import HomeView from '@/views/HomeView.vue'
import TestView from '@/views/TestView.vue'
import DebugView from '@/views/DebugView.vue'
import CategoryView from '@/views/CategoryView.vue'
import RandomView from '@/views/RandomView.vue'
import ColorDetailView from '@/views/ColorDetailView.vue'
import PaletteDetailView from '@/views/PaletteDetailView.vue'
import RandomPaletteView from '@/views/RandomPaletteView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView
  from '@/views/SignupView.vue'

export default [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/test',
      name: 'test',
      component: TestView,
    },
    {
      path: '/debug',
      name: 'debug',
      component: DebugView,
    },
    {
      path: '/category/:type/:name',

      name: 'category',

      component: CategoryView,
    },
    {
      path: '/random',
      name: 'random',
      component: RandomView,
    },
    {
      path: '/color/:hex',
      name: 'color-detail',
      component: ColorDetailView,
    },
    {
      path: '/palette',
      name: 'palette-detail',
      component: PaletteDetailView,
    },
    {
      path: '/random-palette',
      name: 'random-palette',
      component: RandomPaletteView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    }
]