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


Vue.use(VueSweetalert2)
Vue.use(VueApexCharts)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')


