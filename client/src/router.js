import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Menu from '@/components/Menu/Menu'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import Product from '@/components/Menu/Products'
import Category from '@/components/Menu/Categories'
import Reservation from '@/components/Menu/Reservations'
import Userboard from '@/components/Menu/UserBoard'
import Orders from '@/components/Menu/Orders'
import Products from '@/components/Products/ProductList'
import Details from '@/components/Products/Details'
import Profile from '@/components/Menu/Profile'
import Users from '@/components/Menu/Users'
import NotFound from '@/components/NotFound'

Vue.use(Router)

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    { path: '/products', name: "Products", component: Products },
    { path: '/details', name: "Details", component: Details },
    { path: '*', name: "NotFound", component: NotFound },
    {
        path: '/menu', name: "Menu", component: Menu, meta: { requiresAuth: true },
        children: [
            { path: "/users", name: "Users", component: Users },
            { path: "/product", name: "Product", component: Product },
            { path: "/categories", name: "Category", component: Category },
            { path: "/reservations", name: "Reservation", component: Reservation },
            { path: "/profile", name: "Profile", component: Profile },
            { path: "/userboard", name: "Userboard", component: Userboard },
            { path: "/orders", name: "Orders", component: Orders },
        ]
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
})


Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('products-component', require('./components/Products/Products.vue').default);
Vue.component('productsCategory', require('./components/Products/ProductsCategory.vue').default);
Vue.component('add-to-compare', require('./components/Compare/AddToCompare.vue').default);
Vue.component('miniList', require('./components/Compare/MiniList.vue').default);
Vue.component('compare', require('./components/Compare/CompareList.vue').default);
Vue.component('miniReservation', require('./components/Reservation/Reservation.vue').default);
Vue.component('Hero', require('./components/Hero.vue').default);
Vue.component('Footer', require('./components/Footer.vue').default);

router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = localStorage.usertoken == undefined ? false : true
  if (requiresAuth && !currentUser) {
    next('/')
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }

})


export default router;