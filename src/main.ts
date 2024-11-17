/** @format */

import { createApp } from "vue";
// import "./style.css";
// 引入element-plus 中的ElementPlus组件包
import ElementPlus from "element-plus";
// 引入element-plus样式包
import "element-plus/dist/index.css";
// svg插件需要配置代码：
import "virtual:svg-icons-register";
// 国际化引入
import { zhCn } from "element-plus/es/locales.mjs";
//引入全局样式
import "@/style/index.scss";
// 引入组件样式
import router from "./router";
// 引入路由
// 引入element-puls自带的图标：
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
//引入全局组件：//全局引入存在问题
import Category from "./components/Category/index.vue";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// （整体引用）自动全局导入

import App from "./App.vue";
//导入仓库实例
import pinia from "./store";

//路由鉴权文件的配置：
import "./permisstion";
//安装仓库
app.use(pinia);

app.use(ElementPlus, {
  locale: zhCn,
});
app.use(router);
app.mount("#app");

export default {
  Category,
};
