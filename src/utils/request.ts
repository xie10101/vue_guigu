// 进行axios二次封装：使用请求拦截器与响应拦截器：
import axios from "axios";
import { ElMessage } from "element-plus";
// import useloginStore from "../store/modules/user";
//创建axios实例：--create方法--（基础配置：基础路径，超市的时间）
const request = axios.create({
  //基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000, //超时的时间设置
});

//第二步：request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  // config配置对象中存在headers属性请求头,经常给服务器携带公共参数
  // 请求头携带的两种方式
  //一:
  // 常常调用 配置对象中请求头携带 token验证
  const token = localStorage.getItem("TOKEN");
  //将token配置到请求头中；
  if (token) {
    //undefined ,null代表0-假
    //属性名为--Authorization 或者 token
    config.headers.token = token;
  }
  //二 、
  // const loginStore=useloginStore()
  // if(loginStore.token)
  // {
  //   config.headers.token=loginStore.token
  // }
  //返回 config
  return config;
});
//第三步 :响应拦截器
request.interceptors.response.use(
  (response) => {
    // 简化获取的数据
    return response.data;
  },
  (error) => {
    //失败回调：处理http网洛错误的
    //定义一个变量：存储网络错误信息
    let message = "";
    //http状态码
    const status = error.response.status;
    switch (status) {
      case 401:
        message = "TOKEN过期";
        break;
      case 403:
        message = "无权访问";
        break;
      case 404:
        message = "访问路径错误";
        break;
      case 500:
        message = "服务器出现错误";
        break;
      default:
        message = "网络出现错误";
        break;
    }
    //设置提示信息：
    ElMessage({
      type: "error",
      message,
    });
    // 设置失败的promise对象---用于终结promise链--可以被catch捕捉（说明先执行拦截器再执行 catch try函数）;
    return Promise.reject(error);
    // 抛出错误
  },
);

export default request;
