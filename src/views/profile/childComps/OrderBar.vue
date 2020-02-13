<template>
  <div id="order_bar">
    <box>
      <template v-slot:infoSlot>
        <span>我的订单</span>
        <span class="order_right">全部</span>
      </template>
      <template #itemSlot>
        <box-item
          :itemInfo="item"
          v-for="(item, index) in orderArray"
          :key="index"
        ></box-item>
      </template>
    </box>
  </div>
</template>
<script>
import Box from "components/content/box/Box.vue";
import BoxItem from "components/content/box/BoxItem.vue";
export default {
  props: {
    uid: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      orderArray: [
        {
          link: "https://www.baidu.com",
          img: require("assets/img/profile/order/payment.svg"),
          text: "待付款"
        },
        {
          link: "https://www.bilibili.com",
          img: require("assets/img/profile/order/delivery.svg"),
          text: "待发货"
        },
        {
          link: "https://www.google.com",
          img: require("assets/img/profile/order/takeDelivery.svg"),
          text: "待收货"
        },
        {
          link: "https://www.gamersky.com",
          img: require("assets/img/profile/order/evaluate.svg"),
          text: "评价"
        },
        {
          link: "https://github.com",
          img: require("assets/img/profile/order/postSale.svg"),
          text: "售后"
        }
      ]
    };
  },
  components: {
    Box,
    BoxItem
  }
};
</script>
<style scoped>
#order_bar {
  margin-bottom: 0.5rem;
}
.order_right::after {
  content: "";
  background: url("/img/right_arrow.4987262d.svg") 0 0/1.06rem 1.06rem;
  display: inline-block;
  position: relative;
  top: 0.26rem;
  width: 1.06rem;
  height: 1.06rem;
}
</style>
