<template>
  <div class="tab_control">
    <div
      class="tab_control_item"
      v-for="(item, index) in titles"
      @click="itemClick(index)"
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
  height: 40px;
  line-height: 40px;
}
.tab_control_item span {
  padding-bottom: 8px;
}
.tab_control_item span.active {
  border-bottom: 3px solid var(--color-high-text);
  color: var(--color-high-text);
}
</style>
