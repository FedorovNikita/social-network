import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'

import dateFilter from '@/filters/date.filter'
import localizeFilter from '@/filters/localize.filter'

import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'

import Loader from "@/components/app/Loader"
import VueMeta from 'vue-meta'

import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)

Vue.filter('date', dateFilter)
Vue.filter('localize', localizeFilter)

Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: "AIzaSyAcYNY-cXwFO-JltCXUwwMDW95FDY-OFEE",
  authDomain: "social-network-cafed.firebaseapp.com",
  databaseURL: "https://social-network-cafed.firebaseio.com",
  projectId: "social-network-cafed",
  storageBucket: "social-network-cafed.appspot.com",
  messagingSenderId: "895211918828",
  appId: "1:895211918828:web:10ccfcf514f698b7c9dcc9"
});

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
