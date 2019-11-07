// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'popper.js';
import 'bootstrap';
import './assets/app.css'

import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

import store from './store.js';

window.Fire = new Vue();

import { Form, HasError, AlertError } from 'vform';

Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);

import StarRating from 'vue-star-rating';
Vue.component('star-rating', StarRating);

import Tabs from 'vue-tabs-component';
Vue.use(Tabs);

window.Form = Form;

import VueEditor from 'vue2-editor';
Vue.use(VueEditor);

import swal from 'sweetalert2'
window.swal = swal

const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.toast = toast;

import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App },
  template: '<App/>'
}).$mount('#app')
