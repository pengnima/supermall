<template>
  <div id="canvas_scroll">
    <canvas class="canvas_BG"></canvas>
    <canvas class="canvas_block" :style="{ left: leftBlock + 'px' }"></canvas>
    <div class="point_scroll">
      <div class="scroll_bar">
        <div
          class="point_bar"
          :class="{ active: isActive }"
          :style="{ left: leftPoint + 'px' }"
          @touchstart="pointStart"
          @touchmove="pointMove"
          @touchend="pointEnd"
        ></div>
        <transition name="text">
          <span v-show="isOpacity">拖动滑块完成拼图</span>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      leftBlock: 0,
      leftPoint: 0,
      leftTemp: 0,
      endPos: 0,
      moveDis: 0,
      timer: null,
      obj: null,
      isActive: false,
      isOpacity: true
    };
  },
  props: {
    imgSrc: String
  },
  computed: {},
  mounted() {
    let img = document.createElement("img");
    img.src = this.imgSrc;
    console.log(this.imgSrc);

    let cWidth = document.querySelector("#canvas_scroll").clientWidth;
    let cHeight = document.querySelector("#canvas_scroll").clientHeight;

    img.onload = () => {
      let mc = document.querySelector(".canvas_BG");
      let mc2 = document.querySelector(".canvas_block");
      let ctx = mc.getContext("2d");
      let ctx2 = mc2.getContext("2d");

      this.obj = this.initCanvas(mc, mc2, cWidth, cHeight);

      //改变画布 mc2的位置，让其在最左边
      this.leftBlock = -this.obj.x + 45;
      this.leftTemp = this.leftBlock;

      this.strokePicture(ctx, this.obj, img);
      this.strokePicture(ctx2, this.obj, img, true);
    };
  },
  methods: {
    /**
     * 初始化画布
     */
    initCanvas(mc, mc2, cWidth, cHeight) {
      let mcWidth = cWidth - 10;
      let mcHeight = cHeight - 100;

      //设置画布,图片的大小
      mc2.width = mc.width = mcWidth;
      mc2.height = mc.height = mcHeight;

      //出现拼图的位置，需要用随机数来获取
      let x = Math.round(Math.random() * 150 + mcWidth / 2); // 170 ~ 320
      let y = Math.round(Math.random() * 150 + mcHeight / 5);

      return { x, y, width: mcWidth, height: mcHeight };
    },
    /**
     * 绘制拼图
     */
    strokePicture(ctx, { x, y, width, height }, img, bool = false) {
      /**
       * 配置样式
       */
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(128, 128, 128, 0.8)";
      ctx.fillStyle = "rgba(0,0,0, 0.5)";
      ctx.shadowColor = "black";
      ctx.shadowBlur = bool ? 15 : 0;

      /**
       * 绘制路径
       */
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x - 20, y, 10, 0, 1 * Math.PI);
      ctx.lineTo(x - 30, y);
      ctx.lineTo(x - 40, y);
      ctx.lineTo(x - 40, y - 10);
      ctx.arc(x - 40, y - 20, 10, 0.5 * Math.PI, 1.5 * Math.PI, true);
      ctx.lineTo(x - 40, y - 40);
      ctx.lineTo(x, y - 40);
      ctx.closePath();

      /**
       * 填充/描绘路径
       */
      ctx.fill();
      ctx.stroke();

      /**
       * 重合前后对象，and剪切
       */

      if (bool) {
        ctx.clip();
      } else {
        ctx.globalCompositeOperation = "xor";
      }
      ctx.drawImage(img, 0, 0, width, height);
    },

    /**
     * 触屏方法
     */
    pointStart(e) {
      // console.log(this.imgSrc);
      this.isActive = true;
      this.isOpacity = false;
      clearInterval(this.timer);
    },
    pointMove(e) {
      this.endPos = e.touches[0].pageX;
      let dis = this.endPos - 60;

      if (dis >= 0 && dis <= this.obj.width - 50) {
        this.moveDis = dis;
        // console.log(this.moveDis);
        this.leftPoint = this.moveDis;
        this.leftBlock = this.leftTemp + this.moveDis;
      }
    },
    pointEnd(e) {
      if (this.leftBlock >= 3 && this.leftBlock <= 7) {
        console.log("通过");
        return;
      }
      this.timer = setInterval(() => {
        if (this.moveDis > 0) {
          this.moveDis -= 5;
          this.leftPoint = this.moveDis;
          this.leftBlock = this.leftTemp + this.moveDis;
        } else {
          this.isActive = false;
          this.isOpacity = true;
        }
      }, 15);
    }
  }
};
</script>
<style scoped>
#canvas_scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.canvas_BG {
  display: block;
  margin: 5px auto;
  border-radius: 0.21rem;
}

.canvas_block {
  position: absolute;
  top: 5px;
}
.point_scroll {
  width: 100%;
  height: 2.1rem; /* 400-300-10 = 90 取60 */
}
.scroll_bar {
  position: relative;
  height: 1.7rem;
  width: calc(100% - 10px);
  margin: 10px auto 0px;

  background-color: rgba(128, 128, 128, 0.4);
  border-radius: 0.85rem;

  box-shadow: 2px 2px 2px inset gray;
}
.point_bar {
  width: 2.7rem;
  height: 2.7rem;
  position: absolute;
  top: -0.42rem;

  background: url("~assets/img/captcha/scroll.png") no-repeat;
  background-position: -5px -45px;
}
.point_bar.active {
  background-position: -5px -117px;
}
.scroll_bar span {
  position: absolute;
  color: rgb(87, 87, 87);
  line-height: 1.7rem;
  left: 4.52rem; /* 宽度的一半 - 字体宽度的一半 */
}

/** 
* 过渡动画
*/
.text-enter,
.text-leave-to {
  opacity: 0;
}
.text-enter-active,
.text-leave-active {
  transition: opacity 0.5s;
}
</style>
