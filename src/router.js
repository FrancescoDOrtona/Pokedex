import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './components/Homepage.vue'
import Pokedex from './components/Pokedex.vue';


const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
      // always scroll to top
      return { top: 0 };
    },
    history: createWebHistory(),
    routes: [
        {
          path: '/',
          name: 'Homepage',
          component: Homepage
        },
        {
          path: '/pokedex/:searchTerm',
          name: 'Pokedex',
          component: Pokedex
        }
      ],
  });
  export { router };