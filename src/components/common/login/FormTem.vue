<template>
  <div>
    <div id="form_tem">
      <label :for="idName">{{ labelName }}</label>
      <input
        :type="checkType"
        :id="idName"
        @input="checkFormat($event, idName)"
        @blur="blurInput"
      />
    </div>
    <p :style="{ color: pColor }" v-show="$parent.state == false">
      {{ ownMsg || msg }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    labelName: String,
    idName: String,
    msg: String
  },
  data() {
    return {
      ownMsg: "",
      pColor: "black" //在父组件isTrue里用颜色来判断输入是否符合格式
    };
  },
  computed: {
    checkType() {
      if (this.idName.indexOf("pass") != -1) {
        return "password";
      } else {
        return "text";
      }
    }
  },
  methods: {
    blurInput(e) {
      this.$emit("blurEvent", this.idName, e.target.value);
    },
    //改变data的值
    changeData(str, str2) {
      this.ownMsg = str;
      this.pColor = str2;
    },
    //检测格式是否正确
    checkFormat(e, name) {
      let value = e.target.value;
      let reg = this.chooseReg(name);
      // 检测格式
      if (reg.test(value)) {
        this.changeData("输入格式正确", "green");
      } else {
        console.log("进来了");
        this.changeData("输入格式错误", "red");
      }

      if (value === "") {
        this.changeData("", "black");
        this.$emit("blurEvent", this.idName, null);
      }
    },
    // 选择对应的正则
    chooseReg(name) {
      switch (name) {
        case "user":
          return /^([\u4e00-\u9fa5]|\w){4,9}$/g;
        case "email":
          return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        case "password":
          return /^\w{6,16}$/;
        case "re_password":
          return /^\w{6,16}$/;
        default:
          break;
      }
    }
  }
};
</script>
<style scoped>
#form_tem {
  background-color: #fff;
  border-radius: 0.2rem;

  display: flex;
}
#form_tem label {
  font-weight: 600;
  color: dodgerblue;
  line-height: 2rem;
}
#form_tem input {
  flex: 1;
  width: 100%;
  height: 2rem;
  padding-left: 0.5rem;

  border: none;
  outline: none;
  border-radius: 0.2rem;
}
p {
  float: left;
  padding-top: 0.2rem;
}
</style>
