/* eslint-disable prettier/prettier */
import vuex from "vuex";
import Vue from "vue";
import axios from "axios";

Vue.use(vuex, axios);

const state = {
  dbid: 100,
  memberInfo: [],
  memberID: 0,
  left: true
};

const mutations = {
  changeLeftDrawer(state) {
    state.left = !state.left;
      } ,
  SET_DATA(state, data) {
    state.memberInfo = data;
  },
  setMemberID(state, memberID) {
    state.memberID = memberID;
  },
  setDBID(state, dbid){
  state.dbid = dbid;
  },
};

const actions = {
  loadMemberInfo({
    commit
  }, payload) {
    axios
      .get(
        "https://restapi20190104050748.azurewebsites.net/api/LoadMemberData/" +
        payload.memberID +
        "/" +
        "100"
      )
      .then(res => {
        let name_items = JSON.parse(res.data);
        let memberInfo = name_items[0];
        commit("SET_DATA", memberInfo);
      })
      .catch(err => {
        alert(err);
      });
  },
 
  saveMemberInfo() {

    let data = JSON.stringify(state.memberInfo);
    axios({
      method: "post",
      url: "https://restapi20190104050748.azurewebsites.net/api/SaveProfileData",
      params: {
        value: data,
        page: "0"
      }
    })
    // .then(function (response) {
    //    self.messageInput = "message has been sent";
    //    self.selectModel = "";      
    //   })
    //   .catch(function (error) {
    // self.messageInput =
    //   "message has not been sent.  There has been an error with the SMS service.";
    // alert(error);
    //   });
  }
};

const getters = {
  memberInfo: state => {
    return state.memberInfo;
  },
  memberID: state => {
    return state.memberID;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
