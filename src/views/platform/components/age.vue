<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const charts = ref();
onMounted(() => {
  let mycharts = echarts.init(charts.value);
  //设置配置项:

  let option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: 40,
      right: 10,
      left: "center",
      orient: "vertical",
      textStyle: {
        color: "white",
        fontSize: 16,
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
    //调整图像图标的位置：
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 20,
    },
  };
  mycharts.setOption(option);
});
</script>
<template>
  <div class="box3">
    <div class="title">
      <p style="color: white; font-size: 20px">年龄比例</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<style lang="scss" scpoed>
.box3 {
  margin-top: 10px;
  width: 100%;
  height: 100%;
  background: url("../images/dataScreen-main-lt.png") no-repeat;
  background-size: 100% 100%;
  .bg {
    width: 69px;
    height: 8px;
    background: url("../images/dataScreen-title.png"), no-repeat;
  }
  .charts {
    height: 260px;
  }
}
</style>
