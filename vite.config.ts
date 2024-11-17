import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
// vite-plugin-mock插件引入模块
import { viteMockServe } from "vite-plugin-mock";

export default defineConfig(({ command, mode }) => {
  //获取各种环境下的对应的变量：
  const env = loadEnv(mode, process.cwd());
  // 项目根目录的获取： vite项目根目录： process.cwd() 项目根目录.可以是
  return {
    plugins: [
      vue(),
      // 不同的插件
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "iocn-[dir]-[name]",
      }),
      viteMockServe({
        //default
        mockPath: "mock",
        localEnabled: command === "serve",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"), //相对路径别名配置，使用@代替src
      },
    },
    // 用于设置全局变量--scss
    css: {
      preprocessorOptions: {
        scss: {
          // javascriptEnabled:true,
          additionalData: '@import "@/style/variable.scss";',
        },
      },
    },
    //代理跨域设置：
    server: {
      //设置对应环境下的代理跨域关键字
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //服务器地址设置
          target: env.VITE_SERVE,
          //是否改变源 ，是否需要代理跨域
          changeOrigin: true,
          //路经重写：  -删除api
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
