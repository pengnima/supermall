<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.nav-bar {
  display: flex;
  height: 1.9rem;
  line-height: 1.9rem;
  text-align: center;
  box-shadow: 0px 0.04rem 2px rgba(100, 100, 100, 0.5);
  font-size: 0.768rem;
}
.left,
.right {
  width: 2.56rem;
}
.center {
  flex: 1;
}
</style>
