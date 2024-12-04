<!-- @format -->

<template>
  <!-- 首页菜单+上下边框的设置 -->
  <div class="common-layout">
    <el-container>
      <el-aside
        class="menu_aside"
        :class="{ fold: TabbarStore.fold ? true : false }"
      >
        <LOGO></LOGO>
        <el-scrollbar class="scroll">
          <el-menu
            class="menu"
            :default-active="default_index"
            :collapse="TabbarStore.fold"
          >
            <Menus :menulist="menulist"></Menus>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container class="menu_contain">
        <el-header class="menu_head">
          <Tabbar></Tabbar>
        </el-header>
        <el-main class="menu_main">
          <!-- 此布局设置组件--默认存在滚动轴- -->
          <div class="main_layout">
            <MAIN></MAIN>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ElNotification } from "element-plus";
import { getTime } from "../../utils/getTime";
import LOGO from "./logo/logo.vue";
import MAIN from "./components/main.vue";
import Menus from "./components/menu.vue";
import useloginStore from "../../store/modules/user";
import Tabbar from "./tabbar/tabbar.vue";
//如何设置消息提示框打开位置
defineOptions({
  name: "home",
});
ElNotification({
  title: getTime(),
  message: "欢迎来到硅谷甄选",
  type: "success",
});

//获取路由数组;
const loginStore = useloginStore();
const menulist = loginStore.menuRoutes;
import { useRoute } from "vue-router";
const route = useRoute();
let default_index = route.path;

//控制菜单的折叠：

//引入折叠变量与函数：--菜单整体折叠的实现：
import useTabbarStore from "../../store/setting";
let TabbarStore = useTabbarStore();

// const tabbarFold=TabbarSore.changefold;
</script>

<style lang="scss" scoped>
.menu_aside {
  /* 宽度设置为全局变量 */
  width: $bar_aside_width;
  height: 100vh;
  background-color: $bar_aside_color;
  scrollbar-width: none;
  transition: all 1s;
  &.fold {
    width: $bar_aside_width_fold;
  }
}
.menu_contain {
  // width: 100vw-$bar_aside_width;

  height: 100vh;
}
.menu_head {
  width: 100vw-$bar_aside_width;
  height: $bar_head_height;
  padding: 0;
  // background-color: skyblue;
}
.menu_main {
  width: 100vw-$bar_aside_width;
  height: 100vh-$bar_head_height;

  padding: 0;
}
.main_layout {
  height: 1000px;
  padding: 20px;
}
// .menu
// {
//   --el-menu-bg-color:#13204f;
//   --el-menu-text-color:#878ce2;
//   --el-menu-active-color:rgb(149, 91, 240);
//   //活动菜单页的样式
// }
// .menu :hover
// {
//   background-color: pink;
// }
// .scroll
// {
//     height: 100vh-$bar_aside_logo_height;
// }
// .el-menu-item:hover{
//   background-color: pink;
// }
</style>
