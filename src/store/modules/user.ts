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
import { baseroutes } from "../../router/routes";
import { useRoute } from "vue-router";
// import { useRouter } from "vue-router";
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
        const Message = ref<string>();
        const type = ref("");
        if (result.code == 200) {
          Message.value = "登录成功";
          type.value = "success";
          console.log(result.data);

          token.value = result.data as string;
          localStorage.setItem("TOKEN", result.data as string);
          const redirect = $route?.query?.redirect;
          // if ($route?.query) {
          //   console.log(redirect);
          router.push({ path: (redirect as string) || "/home" });
          // } else {
          //   // 定言--可用类型多的变量被赋值给可用类型少的变量时 应将 多变量定言为固定类型变量
          // router.push({ path: "/home" });
          // }
        } else {
          Message.value = "账号或密码有错误";
          type.value = "error";
        }
        ElMessage({
          message: Message.value,
          type: type.value,
        });
        // 进行跳转
      } catch (error) {
        // 抛出错误的方法：
        // throw new Error('Failed to fetch user data');
        console.log(error);
        //
      }
    }

    //暂时不是响应式--一律设置为响应式
    // const menuRoutes:RouteRecordRaw[] = baseroutes
    //将菜单对应路由数组存储到store
    const menuRoutes = ref<RouteRecordRaw[]>(baseroutes);
    interface userInfos {
      avatar: string;
      username: string;
    }
    const userinfos = reactive<userInfos>({ avatar: "", username: "" });

    //获取用户信息
    async function getInfo() {
      try {
        const result: userInfoResponseData = await reqUserInfo();
        const data = result.data; //data中返回按钮权限与路由权限
        // 判断获取失败与否 用信息中code判断--401--token过期--  200正常；
        if (result.code == 200) {
          userinfos.avatar = data.avatar;
          userinfos.username = data.name;
        } else {
          //错误原因--token的过期或被修改
          return Promise.reject(new Error(result.message));
        }
      } catch (error) {
        console.log(error);
      }
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
