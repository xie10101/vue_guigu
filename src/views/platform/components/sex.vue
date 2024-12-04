<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
//获取图形图标的DoM结点
let charts = ref();
//
onMounted(() => {
  //初始化 echarts实例：
  let mycharts = echarts.init(charts.value);
  //设置配置项：  ---条形图设置
  mycharts.setOption({
    //组件标题：
    title: {
      text: "男女比例", //主标题
      textStyle: {
        //设置主标题的颜色：
        color: "skyblue",
      },
      left: "44%",
    },
    //x|y
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: "category", //代表在y轴均匀分布
    },
    series: [
      {
        type: "bar",
        data: [58],
        barWidth: 20,
        zlevel: 10, //设置图形的层级
        itemStyle: {
          color: "blue",
          borderRadius: 15,
        },
      },
      {
        type: "bar",
        data: [100],
        // 设置条形的宽度
        barWidth: 20,
        // 调整女士条形的位置
        barGap: "-100%",
        // 设置女性条形的颜色
        itemStyle: {
          color: "pink",
          borderRadius: 15,
        },
      },
    ],
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
  <div class="box1">
    <div class="title">
      <p>男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="sex">
      <div class="man">
        <img src="../images/man.png" alt="" />
      </div>
      <div class="woman">
        <img src="../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<style lang="scss" scpoed>
.box1 {
  margin-top: 15px;
  width: 100%;
  height: 100%;
  background: url(../images/dataScreen-main-lb.png), no-repeat;
  background-size: 100% 100%;
  .title {
    font-size: 20px;
    color: white;
  }
  .bg {
    width: 69px;
    height: 8px;
    background: url("../images/dataScreen-title.png"), no-repeat;
  }
  .sex {
    display: flex;
    justify-content: center;
    .man {
      margin: 32px;
      width: 111px;
      height: 115px;
      background: url(../images/man-bg.png) no-repeat;
      background-size: 100% 100%;
      // 将盒子的内容水平垂直居中
      display: flex;
      justify-content: center; //水平居中
      align-items: center; //垂直居中
    }
    .woman {
      margin: 32px;
      width: 111px;
      height: 115px;
      background: url(../images/woman-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center; //水平居中
      align-items: center; //垂直居中
    }
  }
  .rate {
    display: flex;
    justify-content: space-between;
    color: white;
  }
  .charts {
    height: 100px;
  }
}
</style>
