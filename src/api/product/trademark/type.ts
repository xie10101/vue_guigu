/** @format */

export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
  data?: object;
}
export interface TradeMark {
  //已有品牌存在id 新增没有--此处可选链的作用--如果
  //变量被赋值，变量存在，类型通过 ，变量没被赋值，变量类型不在接口中设置；

  id?: number;
  tmName: string;
  logoUrl: string;
}

//包含全部品牌数据的ts类型:

export type Records = TradeMark[];

//获取的已有全部品牌的数据
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
