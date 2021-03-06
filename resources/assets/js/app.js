
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Vue from 'vue';


require('./bootstrap');

window.Vue = require('vue');


import { Form, HasError, AlertError } from 'vform';


window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue') },
    { path: '/profile', component: require('./components/Profile.vue') },
    { path: '/users', component: require('./components/Users.vue') }
  ]

  const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
  })







  //Vue filters

  Vue.filter('uppercase',function(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
  });

  Vue.use(require('vue-moment'));



// vue progress bar
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '3px'
})


// sweet alert
import VueSweetalert2 from 'vue-sweetalert2';
 
const options = {
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
};
 
Vue.use(VueSweetalert2, options);



// updating mysql database instantly
window.Fire = new Vue();


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app',
    router
});
