<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    count: 0
  },
  mounted() {
    // 下方防止在网速慢的情况下，slide的count数不准确
    this.$store.commit("slideCountChange", 1);
    if (this.$store.state.slideCount == this.count) {
      this.$emit("slideEven");
      this.$store.commit("slideCountChange", -this.count);
    }
  }
};
</script>
<style>
.slide {
  width: 100%;
  flex-shrink: 0;
}
.slide img {
  width: 100%;
}
</style>
