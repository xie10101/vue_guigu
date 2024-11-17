<!-- @format -->

<template>
  <div class="tabbar_right">
    <el-button
      size="small"
      :icon="Refresh"
      circle
      @click="Refreshing()"
    ></el-button>
    <el-button
      size="small"
      :icon="FullScreen"
      circle
      @click="fullScreen"
    ></el-button>
    <!-- 负责主题的设置 -->
    <el-button
      size="small"
      :icon="Setting"
      circle
      style="margin-right: 10px"
    ></el-button>
    <el-avatar :size="28" :src="loginStore.userinfos.avatar" />
    <el-dropdown style="margin-left: 10px">
      <span class="el-dropdown-link">
        {{ loginStore.userinfos.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="outLogin"> 退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Icons",
});
import { Refresh, FullScreen, Setting } from "@element-plus/icons-vue";
import useTabbarStore from "../../../../store/setting";
import { onMounted } from "vue";
import useloginStore from "../../../../store/modules/user";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const $router = useRouter();
const $route = useRoute();
//实现刷新
const TabbarStore = useTabbarStore();
function Refreshing() {
  TabbarStore.refresh = !TabbarStore.refresh;
}
//全屏
const fullScreen = () => {
  //如果不是全屏模式会返回null
  let full = document.fullscreenElement;
  //切换为全屏模式：
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
//setup是最早执行的***
const loginStore = useloginStore();
onMounted(() => {});
const outLogin = async () => {
  await loginStore.outlogin();
  $router.push({ path: "/login", query: { redirect: $route?.path } });
};
</script>

<style lang="scss" scoped>
.tabbar_right {
  display: flex;
}
</style>
