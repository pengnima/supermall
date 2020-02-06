<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <h2>详情0.0</h2>
    <h2>{{ iid }}</h2>
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
export default {
  name: "detail",
  data() {
    return {
      iid: null
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    console.log(this.iid);
  },
  components: {
    DetailNavBar
  }
};
</script>
<style></style>
