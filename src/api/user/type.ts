/** @format */
//ts类型定义与store中数据 实现分离

//定义用户相关数据的ts类型：

//用户登录接口携带参数的ts类型
export interface loginFormData {
  username: string;
  password: string;
}

//定义全部接口返回数据都拥有的ts类型： code  data message ok

export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//登录接口返回的数据类型： //ts类型的继承
export interface loginResponseData extends ResponseData {
  data: string; //token
}

//定义获取用户信息返回数据类型：
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]; //路由权限；
    buttons: string[]; //按钮权限
    roles: []; //角色；
    name: string;
    avatar: string;
  };
}
