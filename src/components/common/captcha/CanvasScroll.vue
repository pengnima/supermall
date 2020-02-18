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
      /**
       * 控制left的移动
       */
      leftBlock: 0,
      leftPoint: 0,

      /**
       * 移动的位置
       */
      startPos: null,
      endPos: null,
      zeroPos: null,

      timer: null,
      obj: null,
      isActive: false,
      isOpacity: true,

      /**
       * 次数，降为0就退出验证码
       */
      count: 3
    };
  },
  props: {
    imgSrc: String
  },
  computed: {},
  mounted() {
    let img = document.createElement("img");
    img.src = this.imgSrc;
    // console.log(this.imgSrc);

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
      // console.log(mcWidth, mcHeight);
      let x = Math.round(Math.random() * 120 + mcWidth / 2); // 145 ~ 265
      let y = Math.round(Math.random() * 120 + mcHeight / 4);

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
      this.startPos = e.touches[0].clientX;
      if (this.zeroPos == null) {
        this.zeroPos = e.touches[0].clientX;
      }

      this.isActive = true;
      this.isOpacity = false;
      clearInterval(this.timer);
    },
    pointMove(e) {
      this.endPos = e.touches[0].clientX;

      let temp = this.endPos - this.zeroPos;

      if (temp >= 0 && temp <= 240) {
        let dis = this.endPos - this.startPos;
        this.leftPoint += dis;
        this.leftBlock += dis;
        //每次运动完修改 startpos
        this.startPos = e.touches[0].clientX;
      }
    },
    pointEnd(e) {
      if (this.leftBlock >= 1 && this.leftBlock <= 9) {
        //发射一个事件总线
        this.$bus.$emit("captchaEvent");
        console.log("通过验证码，并发送了一个事件总线");
        return;
      }

      //让父组件震动起来
      this.$parent.isShake = true;
      this.count--;
      setTimeout(() => {
        this.$parent.isShake = false;
        if (this.count <= 0) {
          this.$parent.itemClick(false);
          return;
        }
        this.timer = setInterval(() => {
          if (this.leftPoint >= 0) {
            this.leftPoint -= 5;
            this.leftBlock -= 5;
          } else {
            this.leftBlock = -this.obj.x + 45;
            this.isActive = false;
            this.isOpacity = true;
            this.zeroPos = null;
            clearInterval(this.timer);
          }
        }, 15);
      }, 600);
    }
  }
};
</script>
<style scoped>
#canvas_scroll {
  width: 100%;
  height: 100%;
  /* 防止margin-top被重叠 */
  overflow: hidden;
}
.canvas_BG {
  display: block;
  margin: 5px auto;
  border-radius: 5px;
}

.canvas_block {
  position: absolute;
  top: 5px;
}
.point_scroll {
  width: 100%;
  height: 50px;
}
.scroll_bar {
  position: relative;
  height: 40px;
  width: calc(100% - 10px);
  margin: 10px auto 0px;

  background-color: rgba(128, 128, 128, 0.4);
  border-radius: 20px;

  box-shadow: 2px 2px 2px inset gray;
}
.point_bar {
  width: 64px;
  height: 64px;
  position: absolute;
  top: -10px;

  background: url("~assets/img/captcha/scroll.png") no-repeat;
  background-position: -5px -45px;
}
.point_bar.active {
  background-position: -5px -117px;
}
.scroll_bar span {
  font-size: 16px;
  position: absolute;
  color: rgb(87, 87, 87);
  line-height: 40px;
  left: calc(50% - 64px); /* 宽度的一半 - 字体宽度的一半 */
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
