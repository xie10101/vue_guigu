// //统一管理项目用户相关的api请求函数
import request from "../../utils/request";
import { loginFormData, loginResponseData, userInfoResponseData } from "./type";
// // 统一管理接口地址--枚举接口地址:  基地址 /api不需要加

// // 特别注意：在使用箭头函数时
// // 如果函数体中语句仅有一条语句（此语句如果为表达式，则箭头函数的返回值为表达式的结果）
// // 如果函数体使用多条语句 需要使用{} ,返回值需要自己设置,否则为undefined
//项目的用户相关的请求的地址：
enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}

//登录接口：
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);

//获取用户信息：  //token //返回数据类型
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL);

//退出登录：
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);
