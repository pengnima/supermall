import { ADD_CARTCOUNT, ADD_CARTLIST } from "./mutations_type";

export default {
  slideCountChange(state, num) {
    state.slideCount += num;
  },
  [ADD_CARTCOUNT](state, payload) {
    payload.count += 1;
  },
  [ADD_CARTLIST](state, payload) {
    state.cartList.push(payload);
  }
};
