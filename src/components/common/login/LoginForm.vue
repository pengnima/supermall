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

import { postRegisterUser, postLoginUser } from "network/login.js";

import { CHANGE_UID } from "@/store/mutations_type.js";

import { TK, R_TK, getUid } from "common/const.js";

export default {
  data() {
    return {
      isKeep: false,
      userInfo: {
        user: "",
        email: "",
        password: "",
        re_password: ""
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
  watch: {
    state() {
      if (this.state == false) {
        if (this.userInfo.user != "" || this.userInfo.password != "") {
          for (const key in this.userInfo) {
            this.$refs[key][0].myModel = "";
          }
        }
      }
    }
  },
  created() {},
  mounted() {
    this.$bus.$on("captchaEvent", () => {
      this.passCaptcha();
    });
  },
  beforeDestroy() {
    this.$bus.$off("captchaEvent", () => {
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
    isRegisterTrue() {
      for (const key in this.userInfo) {
        if (this.userInfo[key] === "") {
          return false;
        }
      }
      return true;
    },
    isLoginTrue() {
      if (this.userInfo.user != "" && this.userInfo.password != "") {
        return true;
      } else return false;
    }
  },
  methods: {
    submitClick() {
      console.log(this.userInfo);
      //登录
      if (this.state) {
        if (this.$refs.boxRef.isCheck) {
          console.log("选择了记住密码");
          this.isKeep = true;
        } else {
          this.isKeep = false;
        }
        this.checkLogin();
      }
      //注册
      else {
        this.checkRegister();
      }
    },
    //检测登录用函数
    checkLogin() {
      //1. 检测格式
      if (this.isLoginTrue) {
        //2. 弹出滑动验证码(测试，先把滑动验证码关了)
        // this.$refs.captchaRef.itemClick(true);
        // this.$refs.captchaRef.refreshClick();

        this.postLoginUser();
        //3. 通过进入 网络相关 函数
      } else {
        this.$toast.show("请输入账号密码", 2000);
      }
    },
    //检测注册用函数
    checkRegister() {
      //1. 检测格式
      if (this.isRegisterTrue) {
        //2. 检测密码输入是否一致
        if (this.userInfo.password != this.userInfo.re_password) {
          console.log(this.userInfo);
          this.$refs.re_password[0].changeData("输入的密码不一致", "red");
        } else {
          //3. 弹出滑动验证码
          this.$refs.captchaRef.itemClick(true);
          this.$refs.captchaRef.refreshClick();
          //4. 如果通过 滑动验证即进入 网络相关 函数
        }
      } else {
        this.$toast.show("请正确填写信息", 2000);
      }
    },
    /**
     * 网络相关
     */
    //注册
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

    //登录
    async postLoginUser() {
      let res = await postLoginUser(this.userInfo, this.isKeep);
      if (res) {
        this.$toast.show("登录成功", 1500);
        this.$refs.user[0].myModel = "";
        this.$refs.password[0].myModel = "";

        // 设置 storage
        if (res.refreshToken != null) {
          localStorage.setItem(TK, res.token);
          localStorage.setItem(R_TK, res.refreshToken);
        } else {
          sessionStorage.setItem(TK, res.token);
        }
        // 设置 VueX的uid
        let uid = getUid();
        this.$store.commit(CHANGE_UID, uid);

        this.$router.replace("/profile/" + uid);
      } else {
        // this.$toast.show("账号或密码错误", 1500);
        this.$refs.user[0].changeData("用户名或密码错误", "red");
        this.$refs.password[0].changeData("用户名或密码错误", "red");
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
      } else {
        this.postLoginUser();
      }
    }
  }
};
</script>

<style scoped>
#login_form {
  margin: 1.5rem 0.5rem;
  overflow: hidden;
}
#login_form > div[class^="form"] {
  margin-top: 1.5rem;
}

.login_form > div,
.sign_form > div {
  transition-duration: 0.5s;
}

.login_form div:nth-child(2),
.login_form div:nth-child(4) {
  transform: translateX(200%) scale(0.1);
  opacity: 0;
  visibility: hidden; /* 隐藏起来，避免login时按Tab键时出错 */
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
