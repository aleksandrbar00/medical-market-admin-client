import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import VueNumberInput from '@chenfengyuan/vue-number-input'


Vue.config.productionTip = false

Vue.component('vue-number-input', VueNumberInput)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created(){
    try{
      store.dispatch('initStore')
    }catch (e) {
      console.log(e)
    }
  }
}).$mount('#app')
