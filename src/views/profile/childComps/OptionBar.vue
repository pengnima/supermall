<template>
  <div id="order_bar">
    <box>
      <template v-slot:infoSlot>
        <span>我的设置</span>
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
          img: require("assets/img/profile/option/signIn.svg"),
          text: "签到"
        },
        {
          link: "https://www.bilibili.com",
          img: require("assets/img/profile/option/customer.svg"),
          text: "客服"
        },
        {
          link: "https://www.google.com",
          img: require("assets/img/profile/option/manage.svg"),
          text: "设置"
        },
        {
          link: "https://www.gamersky.com",
          img: require("assets/img/profile/option/orientation.svg"),
          text: "定位"
        },
        {
          link: "https://github.com",
          img: require("assets/img/profile/option/recharge.svg"),
          text: "充值"
        },
        {
          link: "https://github.com",
          img: require("assets/img/profile/option/rise.svg"),
          text: "报表"
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
</style>
