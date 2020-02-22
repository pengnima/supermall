<template>
  <div id="profile">
    <user-bar :uBaseInfo="uBaseInfo"></user-bar>
    <order-bar :uid="uBaseInfo.uid"></order-bar>
    <option-bar :uid="uBaseInfo.uid"></option-bar>
    <div class="login_out" @click="quitClick">退出账号</div>
  </div>
</template>
<script>
import UserBar from "./childComps/UserBar.vue";
import OrderBar from "./childComps/OrderBar.vue";
import OptionBar from "./childComps/OptionBar.vue";
import { removeToken, getToken, getUid } from "common/const.js";
import { postQuitLogin } from "network/login.js";

export default {
  data() {
    return {
      uBaseInfo: {
        //通过uid到达用户的个人界面
        uid: "",
        uname: "彭尼玛2020",
        uavatar: require("assets/img/profile/avatar.svg")
      }
    };
  },
  components: {
    UserBar,
    OrderBar,
    OptionBar
  },
  created() {
    this.uBaseInfo.uid = this.$route.params.uid;
    console.log(this.uBaseInfo.uid);
  },
  methods: {
    quitClick() {
      //1. 让服务器记录当前的token的第三条字段signature
      this.quitLogin();

      //2. 清除当前的storage
      removeToken();

      //3. 路由跳转到登录界面
      this.$router.replace("/login");
    },
    async quitLogin() {
      let allToken = getToken();
      let res = await postQuitLogin(getUid(), allToken);
      if (res) {
        //成功记录了uinfor里的 token
        console.log("成功记录");
      } else {
        console.log("记录失败");
      }
    }
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
