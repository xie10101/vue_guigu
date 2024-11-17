<template>
  <div class="tabbar">
    <Bread></Bread>
    <Icons></Icons>
  </div>
</template>
<script setup>
import Icons from "./icons/icons.vue";
import Bread from "./breadcrumb/breadcrumb.vue";
defineOptions({
  name: "Tabbar",
});
</script>

<style scoped lang="scss">
.tabbar {
  // 封装的子组件对父组件外轮廓的复制
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  // background-color: grey;
  background-image: linear-gradient(to right, white, rgb(163, 191, 202), white);
  align-items: center;
  //垂直方向
}
</style>
