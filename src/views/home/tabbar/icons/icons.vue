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
    <el-popover
      placement="top-start"
      title="主题设置"
      :width="200"
      trigger="hover"
    >
      <template #reference>
        <el-button
          size="small"
          :icon="Setting"
          circle
          style="margin-right: 10px"
        ></el-button>
      </template>
      <!-- 默认插槽设置的是 卡片中的内容 -->
      <!-- 解决取色器闪退问题：  :teleported="false"  -->
      <el-form>
        <el-form-item label="主题颜色设置：">
          <el-color-picker
            v-model="color"
            show-alpha
            :predefine="predefineColors"
            :teleported="false"
            @active-change="changeColor"
          />
        </el-form-item>
        <el-form-item label="暗黑主题：">
          <el-switch
            v-model="dark"
            class="mt-2"
            inline-prompt
            active-icon="Sunny"
            inactive-icon="Moon"
            style="--el-switch-on-color: skyblue; --el-switch-off-color: #000"
            @change="onSwitch"
          />
        </el-form-item>
      </el-form>
    </el-popover>

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
import { onMounted, ref } from "vue";
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
//取色器颜色绑定：
const color = ref("");
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);
//开关绑定的变量：
const dark = ref(true);
// 监听开关打开变化
const onSwitch = () => {
  //获取html根节点
  console.log(dark.value);
  const Html = document.documentElement;
  const aa = dark.value ? (Html.className = " ") : (Html.className = "dark");
  console.log(aa);
  // 12 > 23//;
  // Expected an assignment or function call and instead saw an expression. eslint报错 不能单独设置一个表达式
};
const changeColor = (value: any) => {
  console.log(value); //选中的颜色对象
  //获取html根节点
  const Html = document.documentElement;
  //设置根节点的样式
  Html.style.setProperty("--el-color-primary", value);
};
</script>

<style lang="scss" scoped>
.tabbar_right {
  display: flex;
}
</style>
