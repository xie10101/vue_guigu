<template>
  <div class="tabbar_left">
    <!-- 菜单图标 -->
    <el-icon style="margin-right: 20px" @click="changefold">
      <component :is="TabbarSore.fold ? Expand : Fold"></component>
    </el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="(item, index) in $route.matched"
        :key="index"
        v-show="!(item.path == '/home')"
        style="line-height: 14px"
      >
        <el-icon :class="item.meta.icon" style="margin-right: 5px" size="18">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span style="display: inline-block; margin-bottom: 6px">{{
          item.meta.title
        }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Bread",
});
import useTabbarStore from "../../../../store/setting";
import { ArrowRight, Expand, Fold } from "@element-plus/icons-vue";
let TabbarSore = useTabbarStore();
// let fold=TabbarSore.fold//此处的赋值仅发生一次不能动态实现
const changefold = () => {
  TabbarSore.fold = !TabbarSore.fold;
};

//获取路由对象；
import { useRoute } from "vue-router";
const $route = useRoute();

//对路由数组的直接获取赋值会导致其失去响应式
// let arr_route=reactive($route.matched);
</script>

<style lang="scss" scoped>
.tabbar_left {
  display: flex;
  align-items: center;
}
:deep .is-link {
  line-height: 20px;
  vertical-align: middle;
}
</style>
