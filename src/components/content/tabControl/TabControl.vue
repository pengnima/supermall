<template>
  <div class="tab_control">
    <div class="tab_control_item" v-for="(item, index) in titles">
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    titles: Array
  }
};
</script>
<style scoped>
.tab_control {
  display: flex;
}
</style>
