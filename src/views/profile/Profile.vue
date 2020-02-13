<template>
  <div id="profile">
    <user-bar :uBaseInfo="uBaseInfo"></user-bar>
    <order-bar :uid="uBaseInfo.uid"></order-bar>
    <option-bar :uid="uBaseInfo.uid"></option-bar>
    <div class="login_out">退出账号</div>
  </div>
</template>
<script>
import UserBar from "./childComps/UserBar.vue";
import OrderBar from "./childComps/OrderBar.vue";
import OptionBar from "./childComps/OptionBar.vue";

export default {
  data() {
    return {
      uBaseInfo: {
        //通过uid到达用户的个人界面
        uid: "7654321",
        uname: "彭尼玛2020",
        uavatar: require("assets/img/profile/avatar.svg")
      }
    };
  },
  components: {
    UserBar,
    OrderBar,
    OptionBar
  }
};
</script>
<style scoped>
#profile {
  font-size: 0.68rem;
  background-color: rgba(190, 190, 190, 0.2);
  height: 100vh;
}
.login_out {
  font-size: 0.8rem;
  color: white;

  width: 15rem;
  height: 2rem;
  line-height: 2rem;
  margin: 0 auto;

  background-color: var(--color-high-text);
  border-radius: 0.2rem;

  text-align: center;
}
</style>
