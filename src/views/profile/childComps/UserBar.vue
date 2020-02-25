<template>
  <div id="user_bar">
    <div class="link_BG">
      <a href="转到个人用户界面">
        <div class="avatar">
          <img :src="uImg" class="avatar_img" />
          <img src="~assets/img/profile/vipnum_72x72.png" class="vip_sign" />
        </div>
      </a>
      <p class="user_name">{{ uBaseInfo.uname }}</p>
      <a href="转到会员地址">
        <div class="vip_link"></div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    //uBaseInfo里包括了uid,uname,uavatar
    uBaseInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    uImg() {
      if (this.uBaseInfo.uavatar != "") {
        console.log(this.uBaseInfo.uavatar); //"assets/img/profile/avatar.svg"
        return require("@/" + this.uBaseInfo.uavatar);
        //return require("assets/img/profile/avatar.svg");
      }
    }
  }
};
</script>
<style scoped>
#user_bar {
  height: 8rem;
  background: url("~assets/img/profile/userBG_750x229.png") 0 0 no-repeat;
  background-size: 100% 4rem;
  /* 子元素的margin-top会导致父元素位置改变，用下面2个任意一个都可以解决 */
  overflow: hidden;
  /* border: 0.04rem solid gray; */
  position: relative;
}
.link_BG {
  width: 15rem;
  height: 5.5rem;
  margin: 2rem auto 0rem;

  background-color: #fff;

  border-radius: 0.4rem;
}
.avatar {
  width: 3rem;
  height: 3rem;
  border: 0.04rem solid gray;
  border-radius: 50%;
  margin: 0 auto;
  background-color: #fff;

  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);

  text-align: center;
}

.avatar .avatar_img {
  width: 100%;
  height: 100%;
}
.avatar .vip_sign {
  width: 1rem;
  height: 1rem;

  position: absolute;
  bottom: 0;
  right: 0;
}

.user_name {
  font-size: 0.75rem;
  font-weight: 600;

  padding-top: 2rem;
  padding-bottom: 0.2rem;
  text-align: center;
}
.vip_link {
  background: url("~assets/img/profile/vip_1404x216.png") 0 0 no-repeat;
  width: 100%;
  height: 2.5rem;
  background-size: 100% 100%;

  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
</style>
