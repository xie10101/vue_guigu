//设置有关角色管理部分的接口：
import request from "../../utils/request";
import type { RoleData, RoleResponseData, PermissionData } from "./type";
enum API {
  ALLROLE_URL = "/admin/acl/role",
  ADDROLE_URL = "/admin/acl/role/save",
  UPDATE_ROLE_URL = "/admin/acl/role/update",
  ALLPERMISSION = "/admin/acl/permission/toAssign",
  // 分配权限：
  ADDPERMISSION_URL = "/admin/acl/permission/doAssign",
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

//获取职位对应的菜单权限(返回数据包括已有的菜单与按钮权限)：
export const getPermission = (roleId: number) =>
  request.get<PermissionData, any>(API.ALLPERMISSION + `/${roleId}`);

//get请求 ：query 参数携带 params：{ }  --等效于？ /？roleName=${roleName}
//post请求：body 参数携带 data：{ }  可以省略
// put请求：body 参数携带 data：{ }  注意注意 post put 携带的body数据需要{ } --框住

// 分配权限：

export const reqAddPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.ADDPERMISSION_URL + `/?roleId=${roleId}&permissionId=${permissionId}`
  );
// QUERY参数的格式： /?   =${}&
