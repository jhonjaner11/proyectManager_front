import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

axios.defaults.baseURL= "http://localhost:3000/api/";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user:null,
    auth : false,
  },
  mutations: {
    SET_USER(state, user){
      state.user = user;
    },

    SET_AUTH(state,bool){
      state.auth = bool;
    }
  },
  actions: {
    async login({dispatch},data){
      console.log("esta es la data");
      console.log(data);
      await axios
      .post('http://localhost:3000/api/login/', {"username":data.user})
      .then(response => {
         //this.$session.start()
         //this.$session.set(response.data[0].id)
          console.log(response.data[0]);
        
          var data = response.data[0];
          
          return dispatch("getUser", data);
      })
    },

    logout({dispatch}){
      return dispatch("getUser", null)
    },

    getUser({commit}, data){
      let bool;
      if (data) {
        bool = true;
      }else{
        bool = false;
      }
      commit("SET_USER", data);
      commit("SET_AUTH" , bool);
    }

  },
  modules: {},
});
