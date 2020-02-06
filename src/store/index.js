import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    slideCount: 0
  },
  mutations: {
    slideCountChange(state, num) {
      state.slideCount += num;
    }
  }
});

export default store;
