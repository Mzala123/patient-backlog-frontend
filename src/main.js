import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import VueApexCharts from 'vue-apexcharts'
import store from './store'
//socket io config
//import * as io from 'socket.io-client'
import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(
  new VueSocketIO({
   debug: true,
   connection: io('https://patient-backlog-api.herokuapp.com'),
})
);

Vue.use(VueSweetalert2)
Vue.use(VueApexCharts)
Vue.use(VueAxios, axios)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')


