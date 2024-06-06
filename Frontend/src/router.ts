import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue';
import Building from './components/Building.vue';




const routes = [
  {path: '/',name: 'Home',component: Home},
  {path: '/Building/:id',name: 'Building',component: Building, props: true},
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
