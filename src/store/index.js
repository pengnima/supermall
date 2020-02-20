import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

const state = {
  slideCount: 0,
  cartList: [],
  uid: ""
};
const store = new Vuex.Store({
  state,
  mutations,
  actions
});

export default store;
