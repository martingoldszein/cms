import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import EditObraDetailsDialog from './components/Obra/Edit/EditObraDetailsDialog.vue'
import EditPublicacionDetailsDialog from './components/Publicacion/Edit/EditPublicacionDetailsDialog.vue'
import RegisterDialog from './components/Obra/Registration/RegisterDialog.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-publicacion-details-dialog', EditPublicacionDetailsDialog)
Vue.component('app-edit-obra-details-dialog', EditObraDetailsDialog)
Vue.component('app-obra-register-dialog', RegisterDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAEbB9VZuSO-pNZiDC2zXz2ws3VIVhyV1g',
      authDomain: 'lucianokruk-68d2d.firebaseapp.com',
      databaseURL: 'https://lucianokruk-68d2d.firebaseio.com',
      projectId: 'lucianokruk-68d2d',
      storageBucket: 'gs://lucianokruk-68d2d.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadObras')
    this.$store.dispatch('loadPublicaciones')
  }
})
