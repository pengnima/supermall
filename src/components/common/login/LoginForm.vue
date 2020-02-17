<template>
  <div id="login_form" :class="isLogin">
    <div v-for="(item, index) in formInfo" :key="index" class="form">
      <form-tem
        :labelName="item.name"
        :idName="item.id"
        :msg="item.msg"
        @blurEvent="blurEvent"
        :ref="item.id"
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

import { postRegisterUser } from "network/login.js";
export default {
  data() {
    return {
      userInfo: {
        user: null,
        email: null,
        password: null,
        re_password: null
      },
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
  mounted() {
    this.$bus.$on("captchaEvent", () => {
      this.passCaptcha();
    });
  },
  computed: {
    isLogin() {
      return this.state ? "login_form" : "sign_form";
    },
    isSubmit() {
      return this.state ? "登录" : "注册";
    },
    isTrue() {
      for (const key in this.userInfo) {
        if (this.$refs[key][0].pColor != "green") {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    submitClick() {
      //登录
      if (this.state) {
        if (this.$refs.boxRef.isCheck) {
          console.log("选择了记住密码");
        }
        this.$refs.captchaRef.itemClick(true);
        this.$refs.captchaRef.refreshClick();
      }
      //注册
      else {
        // 1. 检测信息冲突等
        this.checkFunc();
      }
    },
    //检测用函数
    checkFunc() {
      if (this.isTrue) {
        if (this.userInfo.password != this.userInfo.re_password) {
          console.log(this.userInfo);
          this.$refs.re_password[0].changeData("输入的密码不一致", "red");
        } else {
          this.$refs.captchaRef.itemClick(true);
          this.$refs.captchaRef.refreshClick();
          // 如果通过 滑动验证即进入 网络相关 函数
        }
      } else {
        this.$toast.show("请正确填写信息", 2000);
      }
    },
    /* ===============================================================用来接受事件总线的方法，即通过验证之后，在发送网络相关的请求 */
    /**
     * 网络相关
     */
    async postRegisterUser() {
      let res = await postRegisterUser(this.userInfo);
      if (!res.success) {
        if (Math.round(res.status / 10) === 1) {
          this.$refs.email[0].changeData("注册失败,该邮箱已被注册", "red");
        }
        if (res.status % 10 === 1) {
          this.$refs.user[0].changeData("注册失败,该用户名已被注册", "red");
        }
      } else {
        this.$toast.show("注册成功", 1500);
      }
    },
    /**
     * 事件相关
     */
    blurEvent() {
      this.userInfo[arguments[0]] = arguments[1];
    },
    passCaptcha() {
      this.$refs.captchaRef.itemClick(false);
      if (this.state == false) {
        this.postRegisterUser();
      }
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
