## better-scroll 比原生的滚动条更好，可以解决手机端轮播图无法滑动的问题

### 安装（2.x 版本）

- npm install @better-scroll/core@next --save
- yarn add @better-scroll/core@next

### 引入

```
**ES6语法引入：
  import BScroll from '@better-scroll/core'

**Commonjs语法引入：
  var BScroll = require('@better-scroll/scroll')
```

### 使用（script 方面）

```
**三种引入方式**
//1. 基础滚动
  import BScroll from '@better-scroll/core'
  let bs = new BScroll('.wrapper', {
    // ...... 详见配置项
  })

//2. 增强型滚动 (根据需求引入插件)
  import BScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'

  // 注册插件
  BScroll.use(Pullup)

  let bs = new BScroll('.wrapper', {
    probeType: 3,
    pullUpLoad: true
  })

//3. 全能力滚动
  import BScroll from 'better-scroll' //(一个拥有全部插件能力的 BetterScroll 包,但是体积会相对大很多，推荐按需引入)
  let bs = new BScroll('.wrapper', {
    // ...直接配置插件
    pullUpLoad: true,
    wheel: true,
    scrollbar: true,
  })

```

### 使用（HTML 标签方面）

1. BS 只针对其第一个子元素做滚动，所以一般在需要滚动的 content 外层包裹上一层 div.wrapper
2. 实际滚动的 content 一定要大于 .wrapper
3. 如果是横向滚动，那么 .wrapper 还需要设置 white-space: nowrap ; .content 还要设置 display: inline-block; 样式

---

## 重要的配置选项

1. click: true | tap: true
   > BS 默认会阻止浏览器的原生 click 事件，会导致在滚动的东西无法被 click，用该选项可以解决无法 click 的问题
2. probeType: 3
   > 当 probeType 为 1 的时候，会非实时触发 scroll 事件； probeType 为 2 的时候，会在屏幕滑动的过程中实时的触发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件

---

## API 属性

1. x
   > bs 横轴坐标。
2. y
   > bs 纵轴坐标。
3. maxScrollX
   > bs 最大横向滚动位置。maxScrollX 是负值。
4. maxScrollY
   > bs 最大纵向滚动位置。maxScrollY 是负值。
5. movingDirectionX
   > 判断 bs 滑动过程中的方向（左右）。-1 表示手指从左向右滑
6. movingDirectionY
   > 判断 bs 滑动过程中的方向（上下）。-1 表示手指从上往下滑
7. directionX
   > 判断 bs 滑动结束后相对于开始滑动位置的方向（左右）。 -1 表示手指从左向右滑
8. directionY
   > 判断 bs 滑动结束后相对于开始滑动位置的方向（上下）。-1 表示手指从上往下滑
9. enabled
   > 类型：Boolean,判断当前 bs 是否处于启用状态。
10. pending
    > 类型：Boolean,判断当前 bs 是否处于滚动动画过程中。

## API 方法

1. on(type, fn)
   > 监听当前“ 实例 ”上的钩子函数。如：scroll、scrollEnd 等。
   ```
      //BScroll是实例
     BScroll.on("scroll",(pos)=>{
       console.log(pos); //该pos是个对象，里面有x 和 y 的值
     })
   ```
2. scrollTo(xPos, yPos, ms )
   > 在 ms 时到达 xPos,yPos 的位置

### 插件

1. pullup 插件

   > BetterScroll 提供了监测上拉动作的能力。当成功监测到一次上拉动作时，会触发 pullingUp 事件。通常用于实现列表/页面滚动到底部时，上拉加载更多数据的功能。

   - pullingUp()

     > 该插件触发的事件，到底部小于 threshold 值时，触发一次 pullingUp 事件。

   - finishPullUp()
     > 标识一次上拉加载动作结束。
     > 【注】每次触发上拉事件后，在回调函数的最后，都应该调用 finishPullUp() 方法。在 finishPullUp() 方法调用前不会触发下一次的 pullingUp 事件。

   ```
      //安装
    yarn add @better-scroll/pull-up@next
      //如果是 按需引入的话，需要主动引入 pullup插件，并初始化
    import Pullup from '@better-scroll/pull-up'
      //初始化
    BScroll.use(Pullup)

      //然后，实例化 BetterScroll 时需要传入 pullup 相关配置项 pullUpLoad：
    let bs = new BScroll('.bs-wrap', {
      scrollY: true,
      pullUpLoad: true
    })

    bs.on("pullingUp", () => {
      console.log("拉到底了");
      //做数据节流，防止同一事件多次发出请求
      setTimeout(() => {
        bs.finishPullUp();
      }, 2000);
    });
   ```
