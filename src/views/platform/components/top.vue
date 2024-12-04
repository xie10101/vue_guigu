<script lang="ts" setup>
import { onMounted, ref, onBeforeMount } from "vue";

//返回首页回调：
const goHome = () => {
  window.location.href = "/"; // 浏览器中实现页面重定向
};
//存储当前时间：
import moment from "moment";
let time = ref(moment().format("YYYY年MM月DD日 HH:mm:ss"));
let timer = ref();
//组件挂载完毕更新当前的时间
onMounted(() => {
  // 开启定时器，每秒更新一次时间
  timer.value = setInterval(() => {
    time.value = moment().format("YYYY年MM月DD日 HH:mm:ss");
  }, 1000);
});
onBeforeMount(() => {
  //清除计时器：
  clearInterval(timer.value);
});
</script>

<template>
  <!--  -->
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="middle">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <div class="rbtn">统计报告</div>
      <span class="time">当前时间:{{ time }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 60px;

  display: flex;
}
.left {
  flex: 1;
  background: url(../images/dataScreen-header-left-bg.png) no-repeat;

  background-size: cover;
  .lbtn {
    width: 140px;
    height: 60px;
    float: right;
    background: url(../images/dataScreen-header-btn-bg-l.png) no-repeat;
    background-size: 100% 100%;

    text-align: center;
    line-height: 60px;
    color: #29fcff;
    font-size: 20px;
  }
}
.middle {
  flex: 2;
  .title {
    width: 100%;
    height: 114px;
    background: url(../images/dataScreen-header-center-bg.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;
    color: #29fcff;
    line-height: 114px;
    font-size: 35px;
  }
}
.right {
  flex: 1;
  width: 180px;
  height: 60px;
  background: url(../images//dataScreen-header-right-bg.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  .rbtn {
    width: 140px;
    height: 60px;
    float: left;
    background: url(../images/dataScreen-header-btn-bg-r.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 60px;
    color: #29fcff;
    font-size: 20px;
  }
  .time {
    color: #29fcff;
    font-size: 20px;
    line-height: 60px;
    margin-right: 5px;
  }
}
</style>
