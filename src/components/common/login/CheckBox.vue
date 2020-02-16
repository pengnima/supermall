<template>
  <div id="check_box">
    <label>
      <input class="box" type="checkbox" v-model="isCheck" />
      <span>记住密码</span>
    </label>
    <span>忘记密码？</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCheck: false
    };
  },
  methods: {}
};
</script>
<style scoped>
#check_box {
  margin-top: 1rem;
  position: relative;
  top: -6.5rem;

  display: flex;
  justify-content: space-between;

  color: white;
  font-weight: 600;
}
#check_box label {
  display: flex;
}
#check_box span {
  line-height: 1rem;
}
.box {
  width: 1rem;
  height: 1rem;
  margin-right: 0.2rem;
}
.sign_form #check_box {
  transition-duration: 0.2s;
  transform: translateX(-200%) scale(0.5);
  opacity: 0;
}
.login_form #check_box {
  transition-duration: 0.5s;
  transition-delay: 0.1s;
  opacity: 1;
}
</style>
