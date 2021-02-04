import Vue from 'vue'
import App from './App.vue'
import less from 'less'
import router from './router' 
import axios from 'axios' 
Vue.prototype.$axios = axios;
// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// Vue.use(vConsole)
Vue.use(less)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
 