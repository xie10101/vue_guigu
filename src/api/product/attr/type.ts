/** @format */

//接口参数与接口返数据类型定义：

//响应返回基础数据类型：
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//data数组类型: //对象数组类型
export interface CategoryObj {
  id: number | string;
  name: string;
  category1Id: number | string;
  category2Id: number | string;
}
//分类接口返回完整类型：
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[];
}

export interface CategoryList {
  id?: number;
  attrName: string; //属性名称
  categoryId?: number; //三级分类id
  categoryLevel: number; //3
  attrValueList: AttrsList[];
}

export interface AttrsList {
  id?: number; //
  valueName: string; //属性值
  attrId?: number; //属性id
  flag?: boolean;
}

// 定义获取属性类型：
export interface Attrs extends ResponseData {
  data: CategoryList[];
}
