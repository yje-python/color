import HomeView from '@/views/HomeView.vue'
import TestView from '@/views/TestView.vue'
import DebugView from '@/views/DebugView.vue'
import CategoryView from '@/views/CategoryView.vue'
import RandomView from '@/views/RandomView.vue'

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
    path: '/category',
    name: 'category',
    component: CategoryView,
  },
  {
    path: '/random',
    name: 'random',
    component: RandomView,
  },
]