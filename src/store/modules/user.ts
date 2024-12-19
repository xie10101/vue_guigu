/** @format */
//创建用户相关的小仓库]
//导入创建小仓库的方法
//使用组合式api仓库
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { reqLogin, reqUserInfo, reqLogout } from "../../api/user";
import { ElMessage } from "element-plus";
import {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from "../../api/user/type";
import router from "../../router";
import type { RouteRecordRaw } from "vue-router";
import { constantRoutes, asyncRoutes, anyRoutes } from "../../router/routes";
import { useRoute } from "vue-router";

//创建用户小仓库
const $route = useRoute();
const useloginStore = defineStore(
  "User",
  () => {
    const token = ref<string | null>(localStorage.getItem("TOKEN"));
    //设置为响应式的？问题--在异步函数执行后会主动使用get……函数进行token的获取m
    // token的持久化设置
    //登录请求
    async function loginpost(logindatas: loginFormData) {
      try {
        // const $route = useRoute();
        // 设置返回数据的类型验证：
        const result: loginResponseData = await reqLogin(logindatas);
        // 登录请求：成功200 ->
        // 登录请求：失败203 ->
        const Message = ref<string>("");
        const type = ref<string>("");
        if (result.code == 200) {
          Message.value = "登录成功";
          type.value = "success";
          // token的持久化存储
          token.value = result.data as string;
          localStorage.setItem("TOKEN", result.data as string);
          const redirect = $route?.query?.redirect;

          router.push({ path: (redirect as string) || "/home" });
          // } else {
          //   // 定言--可用类型多的变量被赋值给可用类型少的变量时 应将 多变量定言为固定类型变量
          // router.push({ path: "/home" });
          // }
          //路由处理
          //获取用户可以见路由：
        } else {
          Message.value = "账号或密码有错误";
          type.value = "error";
        }
        ElMessage({
          type: type.value as any,//?
          message: Message.value,
        });
        // 进行跳转
      } catch (error) {
        // 抛出错误的方法：
        // throw new Error('Failed to fetch user data');
        console.log(error);
        //
      }
    }

    //将菜单对应路由数组存储到store
    const menuRoutes = ref<RouteRecordRaw[]>(constantRoutes);
    interface userInfos {
      avatar: string;
      username: string;
    }
    const userinfos = reactive<userInfos>({ avatar: "", username: "" });

    //获取用户信息----此处 处理路由的权限
    async function getInfo() {
      try {
        const result: userInfoResponseData = await reqUserInfo();
        const data = result.data; //data中返回按钮权限与路由权限
        // 判断获取失败与否 用信息中code判断--401--token过期--  200正常；
        if (result.code == 200) {
          userinfos.avatar = data.avatar;
          userinfos.username = data.name;

          //设置路由权限
          const userAsyncRoutes = filterAsyncRoutes(asyncRoutes, data.routes);

          // 将过滤后的路由与任意路由进行拼接
          menuRoutes.value = [
            ...constantRoutes,
            ...userAsyncRoutes,
            ...anyRoutes, // 修复了缺失的逗号
          ] as any;
          console.log(menuRoutes.value);
          // 注意将当前获取的路由进行注册
          const routesToAdd = [
            ...userAsyncRoutes,
            ...(Array.isArray(anyRoutes) ? anyRoutes : [anyRoutes]),
          ];
          routesToAdd.forEach((route) => {
            router.addRoute(route as RouteRecordRaw);
          });
        } else {
          //错误原因--token的过期或被修改
          return Promise.reject(new Error(result.message));
        }
      } catch (error) {
        console.log(error);
      }
    }
    //过滤当前用户需要展示的异步路由：

    function filterAsyncRoutes(
      asyncRoutes: RouteRecordRaw[],
      routes: string[]
    ) {
      //当前item是异步路由所包含的数据
      return asyncRoutes.filter((item) => {
        if (routes.includes(item.name as string)) {
          if (item.children && item.children.length > 0) {
            item.children = filterAsyncRoutes(item.children, routes) as any;
            // 为放入的一级路由item设置孩子路由
          }
        }
        return true;
      });
    }

    //退出登录操作：
    async function outlogin() {
      const result = await reqLogout();
      // 对请求失败与成功的判断
      if (result.code == 200) {
        console.log(result);
        //仓库中数据的清除：
        token.value = "";
        userinfos.avatar = "";
        userinfos.username = "";
        //对本地数据的清除：
        localStorage.removeItem("TOKEN");
      } else {
        // 此处可以不设置抛出错误--一律在响应拦截器中配置即可

        return Promise.reject(new Error(result.message));
      }
    }
    return {
      loginpost,
      token,
      menuRoutes,
      getInfo,
      userinfos,
      outlogin,
    };
  }
  //小仓库存储数据的地方
);
export default useloginStore;
