<template>
  <div class="container">
    <div class="screen" ref="screen">
      <!-- 数据大屏顶部 -->
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="middle">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">右侧</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Top from "./components/top.vue";
import Tourist from "./components/tourist.vue";
import Sex from "./components/sex.vue";
import Age from "./components/age.vue";
import Map from "./components/map.vue";
import Line from "./components/line.vue";
//获取数据大屏存放内容的盒子的dom元素：
let screen = ref();

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
});

// 页面挂载时 背景保持与视口同宽高 ，需要将内部盒子 居中 scale缩放--
const getScale = (w = 1920, h = 1080) => {
  //获取当前视口的宽高 window.innerWidth  window.innerHeight
  let scaleW = window.innerWidth / w; //设计宽度与视口宽度的倍数
  let scaleH = window.innerHeight / h; //设计高度与视口高度的倍数
  return scaleW < scaleH ? scaleW : scaleH;
}; //y轴倍数大   x轴缩放 保持宽度顶满；
//监控视口变换：
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
};
</script>

<style lang="scss" scoped>
// 主体容器长宽按照设计图设置
.container {
  margin: 0; /* 去掉默认的外边距 */
  height: 100vh; /* 设置视口高度，确保背景图能够填充整个屏幕 */
  width: 100vw;
  background-image: url("./images/bg.png"); /* 设置背景图片 */
  background-size: cover; /* 背景图完全覆盖屏幕 */
  background-position: center center; /* 背景图居中 */
  background-repeat: no-repeat; /* 背景图不重复 */
  .screen {
    position: fixed; //位置相对于 屏幕视口
    width: 1920px;
    height: 1080px;
    // 定位 --居中
    left: 50%; //到视口左边界的距离---% 相对于视口的宽高；
    top: 50%;
    //设置基点：
    transform-origin: left top;
    .bottom {
      display: flex;
      height: 1020px;
      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1.5;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .middle {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          margin-top: 30px;
          flex: 2.8;
          background-color: red;
        }
        .line {
          flex: 1;
          background-color: orange;
        }
      }
      .right {
        flex: 1;
      }
    }
  }
}
</style>
