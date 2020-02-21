<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="itemimg"></slot>
    </div>
    <div v-else>
      <slot name="itemimg2"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="itemtext"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /* 该path是通过父组件传递下来的值，所以会根据我点击的父组件显示不同的值 */
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  computed: {
    /* 通过路由路径是否相等，来判断点击的是哪一个 */
    isActive() {
      return this.$route.path.indexOf(this.path) != -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      /* 通过父组件传值给子组件，改变其path属性 */
      // console.log(this.$route.path, this.path);
      if (this.$route.path.indexOf(this.path) == -1) {
        this.$router.push(this.path).catch(err => {
          console.log("路由切换问题ERROR");
        });
      }
    }
  }
};
</script>
<style>
.tab-bar-item {
  /* display:flex 只针对子标签，所以在<template #default>下面只能有一个 子标签，如果外层套了一层div，则无用 */
  flex: 1;
  text-align: center;
  height: 2.09rem;
  font-size: 0.64rem;
}
.tab-bar-item img {
  width: 1.024rem;
  height: 1.024rem;
  margin-top: 0.126rem;
  vertical-align: middle;
}
/* .active {
  color: red;
} */
</style>
