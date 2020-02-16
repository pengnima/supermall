<template>
  <div id="login">
    <login-tab :state="state" @click.native="changeState"></login-tab>
    <login-form :state="state"></login-form>
  </div>
</template>
<script>
import LoginTab from "components/common/login/LoginTab.vue";
import LoginForm from "components/common/login/LoginForm.vue";
export default {
  data() {
    return {
      state: true
    };
  },
  components: {
    LoginTab,
    LoginForm
  },
  methods: {
    changeState() {
      this.state = !this.state;
    }
  }
};
</script>
<style scoped>
#login {
  font-size: 0.68rem;
  background-color: cornflowerblue;
  height: 100%;
  min-height: 100vh;

  /* overflow: hidden;
  width: 100vw; */
}
</style>
