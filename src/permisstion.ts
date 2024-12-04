// 路由监权：某个路由在哪些条件下可以访问，什么条件下不能被访问
import router from "./router"; //获取路由器实例
//全局守卫：项目当中任意路由切换都会触发的钩子；
import nprogress from "nprogress";
// import { useRouter } from "vue-router";
// const $router=useRouter();
import { ElMessage } from "element-plus";
// 去除加载圈
nprogress.configure({ showSpinner: false });
import "nprogress/nprogress.css";
import useloginStore from "./store/modules/user";
import pinia from "./store";
const loginStore = useloginStore(pinia);
import setting from "./views/settings/logo";

interface path_next {
  path: string;
}

// 1.全局前置守卫的配置：
router.beforeEach(
  async (to: any, from: any, next: (first?: path_next) => void) => {
    //设置页面标题：
    document.title = `${setting.title}--${to.meta.title}`;
    nprogress.start();
    console.log(from);
    const token = loginStore.token;
    //判断token是否携带---代表用户是否进行了登录操作：
    if (token) {
      //登录成功--如果还跳转login页不能再跳转到登录页
      //跳转到首页
      if (to.path == "/login") {
        next({ path: "/home" });
      } //如果跳转其他页面放行
      else {
        //需要对用户信息进行处理--判断用户信息的存在？ -存在放行   （现在将信息的请求尝试做多次获取）
        // 不存在获取用户信息---（需要考虑请求时token过期/token被修改的error产生 如果产生error
        // （可以尝试做提示框-按钮点击跳转--信息弹出框进行提示跳转）携带参数跳转到登录/login）
        try {
          await loginStore.getInfo();
          next();
        } catch (error) {
          console.log(error);
          ElMessage({
            message: "token过期或token被修改",
          });
          loginStore.token = "";
          //清空仓库中所有数据（可选）
          //将token设置为空值--放行到login登录页面
          next({ path: "/login" });
        }
      }
    } else {
      //没有获取到token-表示没有登录
      if (to.path == "/login") {
        next();
      } else {
        next({ path: "/login" });
      }
    }
    return true;
  },
);

router.afterEach(() => {
  nprogress.done();
});
