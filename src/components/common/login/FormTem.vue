<template>
  <div>
    <div id="form_tem">
      <label :for="idName">{{ labelName }}</label>
      <input :type="checkType" :id="idName" v-model="myModel" />
    </div>
    <p :style="{ color: pColor }">
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
      pColor: "black", //在父组件isTrue里用颜色来判断输入是否符合格式
      myModel: "" //有了myModel双向绑定，瞅一瞅验证方式是否可以修改
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
  watch: {
    myModel() {
      if (this.chooseReg(this.idName).test(this.myModel)) {
        this.changeData("输入格式正确", "green");
      } else {
        this.changeData("输入格式错误", "red");
      }
      if (this.myModel == "") {
        this.changeData("", "black");
      }
      this.$emit("blurEvent", this.idName, this.myModel);
      console.log("改变了model", this.idName);
    }
  },
  methods: {
    blurInput(e) {},
    //改变data的值
    changeData(str, str2) {
      this.ownMsg = str;
      this.pColor = str2;
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
