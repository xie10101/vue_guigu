//定义用户管理模块需要的类型接口
export interface RootResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//响应到的用户信息类型定义：
export interface UserInfos extends RootResponseData {
  data: UserInfosArr;
}

export interface UserInfosArr {
  records: Record[];
  total: number;
  size?: number;
  current?: number;
  pages?: number;
}

//单个用户信息数据项
export interface Record {
  id?: number;
  createTime?: string;
  updateTime?: string;
  username: string;
  password: string;
  name: string;
  phone?: string;
  roleName?: string;
}
//单个角色信息数据项 类型
export interface Role {
  id: number;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark?: null;
}
//完整的用户包含全部的角色信息
export interface Rolelist extends RootResponseData {
  data: {
    assignRoles: Role[];
    allRolesList: Role[];
  };
}

//所设置的角色数据：
export interface AssignedRoles {
  roleIdList: number[];
  userId: number;
}
