import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

wx.cloud.init({
  env: 'smart-campus-6dae26',
  traceUser: true
})

const app = new Vue(App)
app.$mount()
