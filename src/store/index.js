import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState  from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
     state: {
        username: ""
     },
     mutations: {
        setUser(state, name){
            state.username = name
         }
     },
     plugins: [createPersistedState()]
})