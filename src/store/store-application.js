/* eslint-disable prettier/prettier */
import vuex from "vuex";
import Vue from "vue";
import axios from "axios";

Vue.use(vuex, axios);

const state = {
 left: true
};

const mutations = {
    changeLeftDrawer(state) {
        state.left = !state.left;
          } 
};

 const actions = {
  setLeft(context) {
    context.commit("changeLeftDrawer");
},
  };
 
  


 const getters = {
  left: state => state.left,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
