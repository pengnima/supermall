<template>
  <div id="shop_info">
    <div class="shop_name">
      <img :src="shop.logo" alt="" />
      <span>{{ shop.name }}</span>
    </div>

    <div class="score_info">
      <div class="score_left">
        <div class="score_sell">
          <div>{{ sellValue }}万</div>
          <div style="font-size: 14px;">总销量</div>
        </div>
        <div class="score_item">
          <div>{{ shop.goods }}</div>
          <div style="font-size: 14px;">全部宝贝</div>
        </div>
      </div>
      <div class="score_right">
        <table cellspacing="10px">
          <tr v-for="(item, index) in shop.score">
            <td>{{ item.name }}</td>
            <td :style="{ color: item.isBetter ? 'red' : 'green' }">
              {{ item.score }}
            </td>
            <td
              style="color: white;"
              :style="{ backgroundColor: item.isBetter ? 'red' : 'green' }"
            >
              {{ item.isBetter ? "高" : "低" }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="come_shop">进店逛逛</div>
  </div>
</template>

<script>
export default {
  props: {
    shop: Object
  },
  computed: {
    sellValue() {
      return parseFloat(this.shop.sells / 10000).toFixed(1);
    },
    betterScore(isBetter) {
      if (isBetter) {
        return "{ backgroundColor: red, color: white}";
      } else {
        return "{ backgroundColor: green, color: white}";
      }
    }
  }
};
</script>

<style scoped>
#shop_info {
  padding: 15px 8px;
}
.shop_name img {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(128, 128, 128, 0.5);
  border-radius: 20px;
}
.shop_name span {
  margin-left: 8px;
  position: relative;
  top: -15px;
  font-size: 18px;
}

/**
  * 商店信息左右两侧的样式，整个商店信息是弹性盒子，
  * 可左边用弹性盒子做，右边用table做
  */
.score_info {
  padding: 0px 12px;
  display: flex;
}
.score_left,
.score_right {
  flex: 1;
}
/* 给score_left也做弹性盒子，且其子元素以侧轴中心对齐 */
.score_left {
  display: flex;
  align-items: center;
}
.score_left > div {
  flex: 1;
}
.score_sell,
.score_item {
  text-align: center;
}
.score_item {
  border-right: 1px solid gray;
}
/**
  * 右边用table做的
  */
.score_right > table {
  margin: 0 auto;
  font-size: 15px;
}
/**
  * 进店逛逛的样式
  */
.come_shop {
  width: 150px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 10px;
  background-color: rgba(128, 128, 128, 0.3);
  margin: 0 auto;
}
</style>
