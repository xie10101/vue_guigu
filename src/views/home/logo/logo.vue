<template>
  <div class="logo">
    <img class="img" :src="slots.logo" alt="" />
    <div class="title" v-if="!TabbarStore.fold">{{ slots.title }}</div>
  </div>
</template>

<script lang="ts" setup>
import slots from "../../settings/logo";
defineOptions({
  name: "LOGO",
});
import useTabbarStore from "../../../store/setting";
const TabbarStore = useTabbarStore();
</script>

<style lang="scss" scoped>
.logo {
  width: 95%;
  height: $bar_aside_logo_height;
  display: flex;
  align-items: center;
  margin-left: 5px;
  border-bottom: 2px solid #c7c5c5;
  .img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
  .title {
    font-size: 16px;
    color: #fff;
    margin-left: 5px;
  }
}
</style>
