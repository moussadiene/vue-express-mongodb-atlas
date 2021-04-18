import Vue from 'vue'
import Vuex from 'vuex'
//import { auth }  from './modules/auth.module';
//import { module } from './modules/modules.module'
import clients  from './store/client/index'

//import modules from './services/modules.service'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'primary',
    barImage: 'profile.jpg',
  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload
    },
    
  },
  actions: {

  },
  modules: {
    clients,
  }
})
