<template>
  <div id="cart">
    <nav-bar class="cart_nav_bar">
      <template v-slot:center>
        <div>购物车({{ cartLength }})</div>
      </template>
    </nav-bar>
    <cart-list></cart-list>
    <cart-total></cart-total>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";

import CartList from "./childComps/CartList.vue";
import CartTotal from "./childComps/CartTotal.vue";

export default {
  data() {
    return {};
  },
  computed: {
    cartLength() {
      return this.$store.state.cartList.length;
    }
  },
  components: {
    NavBar,

    CartList,
    CartTotal
  },
  methods: {}
};
</script>
<style scoped>
.cart_nav_bar {
  background-color: var(--color-tint);
  color: white;
}
</style>
