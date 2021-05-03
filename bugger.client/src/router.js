import { createRouter, createWebHashHistory } from 'vue-router'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/bugs',
    name: 'Bug',
    component: loadPage('BugsPage')
  },
  {
    path: '/bugs/:id',
    name: 'BugsDetails',
    component: loadPage('BugsDetailsPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage')
  }
]

const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

export default router
