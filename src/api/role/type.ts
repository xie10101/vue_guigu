export interface ResponseData {
  code: number;
  message: string;
  data: any;
  ok: boolean;
}
// 单个职位数据类型
export interface RoleData {
  id?: number;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark?: null;
}
// 全部职位的数组类型
export type Records = RoleData[];
// 全部职位数据对应的ts类型：
export interface RoleResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
  };
}

//菜单与按钮数据的类型定义：
export interface MenuData {
  id: number; //作为权限标识id唯一
  createTime: string;
  updateTime: string;
  pid: number;//
  name: string;
  code: string;
  toCode: string;
  type: number;
  status: null;
  level: number;
  // 子菜单类型相同
  children?: MenuData[];
  select: boolean; //是否选中
}
//菜单权限与按钮权限数据的ts类型：
export interface PermissionData extends ResponseData {
  data: MenuData[];
}
