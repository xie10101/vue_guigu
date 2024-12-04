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
