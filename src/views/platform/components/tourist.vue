<script setup lang="ts">
import { onMounted, ref } from "vue";
const people = ref("216908人");
import * as echarts from "echarts";
// 水球图拓展的插件
import "echarts-liquidfill";
const charts = ref();
onMounted(() => {
  //获取echarts类的实例：
  let mycharts = echarts.init(charts.value);
  //设置实例的配置项：
  mycharts.setOption({
    //标题组件
    title: {
      text: "水球图",
    },
    //设置x轴：
    xAxis: {},
    // 设置y轴
    yAxis: {},
    //系列：决定你展示什么样的图形图标
    series: {
      type: "liquidFill",
      //条形图bar //折线图 line
      data: [0.6, 0.4, 0.2],
      waveAnimation: true,
      animationDuration: 0,
      animationDurationUpdate: 0,
      radius: "70%", //半径
    },
    //布局组件：
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });
});
</script>
<template>
  <!-- 父组件已经设置了子组件的长宽 -->
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <!-- p 标签是块级元素  --可以设置背景  -->
      <p style="color: #fff; float: right; font-size: 20px; margin-right: 10px">
        可预约总量:<span style="color: orange">99999</span>人
      </p>
      <div class="numbers">
        <!-- 行内元素  -->
        <span v-for="(item, index) in people" :key="index" class="number">{{
          item
        }}</span>
      </div>
      <!-- 水波球 -->
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<style lang="scss" scpoed>
.box {
  width: 100%;
  height: 40%;
  background: url("../images/dataScreen-main-lb.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .bg {
    width: 69px;
    height: 8px;
    background: url("../images/dataScreen-title.png"), no-repeat;
  }
  .title {
    margin-top: 15px;
    font-size: 23px;
    color: #fff;
  }
  .numbers {
    width: 100%;
    display: flex;
    margin-top: 10px;
    padding: 15px;
  }
  .number {
    display: block;
    width: 65px;
    height: 71px;
    background: url("../images/total.png"), no-repeat;
    background-size: 100% 100%;
    color: #29f7fb;
    font-size: 25px;
    text-align: center;
    line-height: 71px;
  }
  .charts {
    width: 100%;
    height: 250px;
  }
}
</style>
