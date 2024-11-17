//用户管理模块接口：
import request from "../../../utils/request";
import { userInfoResponseData } from "../type";
import {
  UserInfos,
  Record,
  RootResponseData,
  Rolelist,
  AssignedRoles,
} from "./type";
//枚举使用场景 ： 需要存放有关联的，包含多个不变的常量的一组数据常常使用enum 来定义：
enum API {
  //获取所有的用户信息；
  GETUSERINFOS = "/admin/acl/user/",
  SAVEUSER = "/admin/acl/user/save",
  UPDATEUSER = "/admin/acl/user/update",
  REMOVEUSER = "/admin/acl/user/remove/",
  // 获取 全部职位，当前职位拥有的职位接口：roleid-由后端定
  GETROLEURL = "/admin/acl/user/toAssign/",
  //为用户分配角色：
  ASSIGNROLES = "/admin/acl/user/doAssignRole",
}
// 语法格式 ：enum API{ }

//获取全部用户信息接口：
export const getUserInfos = (page: number, limit: number) =>
  request.get<any, UserInfos>(API.GETUSERINFOS + `${page}/${limit}`);

//更新与添加接口合并：
export const addOrUpdateInfos = (data: Record) => {
  //id-是否携带 -请求方式的不同 -请求路径的不同
  if (data.id) {
    return request.put<any, RootResponseData>(API.UPDATEUSER, data);
  } else {
    return request.post<any, RootResponseData>(API.SAVEUSER, data);
  }
};

//删除用户信息的接口：
// 此处的id 需要使用 ? --也为id数据最初定义的是可以存在和不存在两种状态 Record --仅设置了一种类型
export const removeUser = (id?: number) =>
  request.delete<any, userInfoResponseData>(API.REMOVEUSER + `${id}`);

//获取用户角色？
export const getUserRoles = (id: number) =>
  request.get<any, Rolelist>(API.GETROLEURL + `${id}`);

//为用户分配角色：
export const assignRoles = (data: AssignedRoles) =>
  request.post<any, userInfoResponseData>(API.ASSIGNROLES, data);
