import { ADD_CARTCOUNT, ADD_CARTLIST } from "./mutations_type";

export default {
  ChangeCart(context, payload) {
    return new Promise((reslove, reject) => {
      let oldCart = null;
      for (const i of context.state.cartList) {
        if (i.iid == payload.iid) {
          oldCart = i;
          break;
        }
      }
      if (oldCart) {
        context.commit(ADD_CARTCOUNT, oldCart);
        reject();
      } else {
        payload.checked = true;
        payload.count = 1;
        context.commit(ADD_CARTLIST, payload);
        reslove();
      }
    });
  }
};
