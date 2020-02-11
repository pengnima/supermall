<template>
  <div id="detail_nav_bar">
    <nav-bar>
      <template #left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="" />
        </div>
      </template>
      <template #center>
        <div class="title">
          <div
            class="title_item"
            v-for="(item, index) in titles"
            :class="{ active: currIndex == index }"
            @click="itemClick(index)"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      // this.currIndex = index; 让滚动自己判断是否红
      this.$emit("itemClickEvent", index);
    },
    backClick() {
      this.$router.back();
    }
  },
  components: {
    NavBar
  }
};
</script>
<style scoped>
#detail_nav_bar {
  /* position: relative; */
  /* z-index: 9; */
  background-color: #fff;
}
.back img {
  margin-top: 0.42rem;
}
.title {
  font-size: 0.64rem;
  display: flex;
}
.title_item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
</style>
