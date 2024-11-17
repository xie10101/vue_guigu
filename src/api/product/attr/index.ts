/** @format */
import { CategoryResponseData, CategoryList, ResponseData } from "./type";
//配置属性相关的接口
import request from "../../../utils/request";

enum API {
  reqCategory1 = "/admin/product/getCategory1",
  reqCategory2 = "/admin/product/getCategory2/",
  reqCategory3 = "/admin/product/getCategory3/",
  ATTRS = "/admin/product/attrInfoList/",
  ADDORUPDATEATTRS = "/admin/product/saveAttrInfo",
  DELETEATTRS = "/admin/product/deleteAttr/",
}

//获取一级分类接口
export const reqC1 = () =>
  request.get<CategoryResponseData, any>(API.reqCategory1);

//获取二级分类接口：
export const reqC2 = (category1?: number) =>
  request.get<CategoryResponseData, any>(API.reqCategory2 + `${category1}`);

//获取三级分类接口

export const reqC3 = (category2?: number) =>
  request.get<CategoryResponseData, any>(API.reqCategory3 + `${category2}`);

// 获取对应商品属性：
export const reqAttrs = (
  category1?: number,
  category2?: number,
  category3?: number,
) =>
  request.get<any, any>(API.ATTRS + `${category1}/${category2}/${category3}`);

//添加/修改属性值：
export const addOrUpdateAttrs = (data: CategoryList) =>
  request.post<any, any>(API.ADDORUPDATEATTRS, data);

//删除属性值：
export const deleteAttrs = (id: number) =>
  request.delete<any, ResponseData>(API.DELETEATTRS + `${id}`);
