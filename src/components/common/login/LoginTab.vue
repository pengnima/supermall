<template>
  <div id="login_tabs">
    <ul :class="isLogin">
      <li><span>登录</span></li>
      <li>或</li>
      <li><span>注册</span></li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    state: Boolean
  },
  computed: {
    isLogin() {
      return this.state ? "login" : "sign";
    }
  }
};
</script>
<style scoped>
#login_tabs ul {
  display: flex;
  justify-content: center;

  list-style: none;

  padding: 0.8rem;
}
#login_tabs li {
  padding: 0 1rem;
  color: white;
}
#login_tabs span {
  border: 1px solid white;
  border-radius: 0.4rem;

  padding: 0.3rem 0.8rem;
}
ul li {
  transition-duration: 0.5s;
}
ul li:nth-child(2) {
  opacity: 0.6;
}

/**
* 样式Login
*/
.login li:nth-child(1) {
  transform: scale(1.5) translateX(50%);
}
.login li:nth-child(2) {
  transform: translateX(120%);
}
.login li:nth-child(3) {
  transform: scale(0.6) translateX(50%);
  opacity: 0.6;
}
/**
* 样式Sign
*/
.sign li:nth-child(1) {
  transform: scale(0.6) translateX(-50%);
  opacity: 0.6;
}
.sign li:nth-child(2) {
  transform: translateX(-120%);
}
.sign li:nth-child(3) {
  transform: scale(1.5) translateX(-50%);
}
</style>
