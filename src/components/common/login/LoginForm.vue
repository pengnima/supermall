<template>
  <div id="login_form" :class="isLogin">
    <div v-for="(item, index) in formInfo" :key="index" class="form">
      <form-tem
        :labelName="item.name"
        :idName="item.id"
        :msg="item.msg"
        @blurEvent="blurEvent(arguments)"
      />
    </div>

    <check-box ref="boxRef"></check-box>
    <div class="submit" @click="submitClick">{{ isSubmit }}</div>
    <captcha ref="captchaRef"></captcha>
  </div>
</template>
<script>
import FormTem from "./FormTem.vue";
import CheckBox from "./CheckBox.vue";
import Captcha from "components/common/captcha/Captcha.vue";
export default {
  data() {
    return {
      user: null,
      email: null,
      password: null,
      re_password: null,
      formInfo: [
        {
          name: "👤 用户名:",
          id: "user",
          msg: "请输入4-9位汉字/数字/字母"
        },
        {
          name: "📧 输入邮箱:",
          id: "email",
          msg: "请输入正确的邮箱地址"
        },
        {
          name: "🔒 输入密码:",
          id: "password",
          msg: "请输入6-16位的数字/字母/下划线"
        },
        {
          name: "🔒 确认密码:",
          id: "re_password",
          msg: "请再次输入一次密码"
        }
      ]
    };
  },
  props: {
    //true为登录，false为注册
    state: Boolean
  },
  components: {
    FormTem,
    CheckBox,
    Captcha
  },
  created() {},
  mounted() {},
  computed: {
    isLogin() {
      return this.state ? "login_form" : "sign_form";
    },
    isSubmit() {
      return this.state ? "登录" : "注册";
    }
  },
  methods: {
    submitClick() {
      if (this.state) {
        if (this.$refs.boxRef.isCheck) {
          console.log("选择了记住密码");
        }
        console.log(this.user, this.password);
        this.$refs.captchaRef.cancelClick();
        // 需要用下面的方法重新渲染一下，才没问题
        this.$refs.captchaRef.refreshClick();
      } else {
        //
        if (this.password != this.re_password) {
          console.log("注册失败");
        }
        console.log(this.user, this.password, this.email, this.re_password);
      }
    },
    blurEvent(str) {
      this[str[0]] = str[1];
    }
  }
};
</script>

<style scoped>
#login_form {
  margin: 2.5rem 0.5rem;
}
#login_form > div[class^="form"] {
  margin-top: 1.5rem;
}
div[class^="form"] p {
  float: left;
  padding-top: 0.2rem;
}

.login_form > div,
.sign_form > div {
  transition-duration: 0.5s;
}

.login_form div:nth-child(2),
.login_form div:nth-child(4) {
  transform: translateX(-200%) scale(0.1);
  opacity: 0;
}
.login_form div:nth-child(3) {
  transform: translateY(-170%);
}
.submit {
  margin-top: 0.8rem;
  height: 2.5rem;
  background-color: royalblue;
  text-align: center;
  line-height: 2.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: white;
}
.login_form .submit {
  transform: translateY(-200%);
}
</style>
