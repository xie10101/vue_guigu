//设置有关角色管理部分的接口：
import request from "../../utils/request";
import type { RoleData, RoleResponseData } from "./type";
enum API {
  ALLROLE_URL = "/admin/acl/role",
  ADDROLE_URL = "/admin/acl/role/save",
  UPDATE_ROLE_URL = "/admin/acl/role/update",
}
//获取全部角色
export const reqAllRole = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(API.ALLROLE_URL + `/${page}/${limit}`, {
    params: {
      roleName,
    },
  });
//添加或者修改角色  // 携带id 是修改  没有携带id 是添加
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_ROLE_URL, data);
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data);
  }
};

//get请求 ：query 参数携带 params：{ }  --等效于？ /？roleName=${roleName}
//post请求：body 参数携带 data：{ }  可以省略
// put请求：body 参数携带 data：{ }  注意注意 post put 携带的body数据需要{ } --框住
