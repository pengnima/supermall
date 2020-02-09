<template>
  <div class="tab_control">
    <div
      class="tab_control_item"
      v-for="(item, index) in titles"
      @click="itemClick(index)"
      :key="index"
    >
      <span :class="{ active: index == currIndex }">{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    titles: Array
  },
  data() {
    return {
      currIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.$emit("tabEvent", index);
    }
  }
};
</script>
<style scoped>
.tab_control {
  display: flex;
  width: 100%;
  text-align: center;
  background-color: #fff;
}
.tab_control_item {
  flex: 1;
  height: 1.68rem;
  line-height: 1.68rem;
}
.tab_control_item span {
  font-size: 0.68rem;
  padding-bottom: 0.26rem;
}
.tab_control_item span.active {
  border-bottom: 0.13rem solid var(--color-high-text);
  color: var(--color-high-text);
}
</style>
