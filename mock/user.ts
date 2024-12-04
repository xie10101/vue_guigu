// 创建函数-执行后返回数组，数组中包含用户信息；
//用户信息数据
function createUserList() {
  return [
    {
      userId: 1,
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      username: "admin",
      password: "111111",
      desc: "平台管理员",
      roles: ["平台管理员"],
      buttons: ["cuser.detail"],
      routes: ["home"],
      token: "Admin Token",
    },
    {
      userId: 2,
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      username: "system",
      password: "111111",
      desc: "系统管理员",
      roles: ["系统管理员"],
      buttons: ["cuser.detail", "cuser.user"],
      routes: ["home"],
      token: "System Token",
    },
  ];
}

//向外暴露一个 数组：数组中包含两个接口：

export default [
  {
    // 登录接口
    url: "/api/user/login",
    method: "post",
    response: ({ body }) => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body;
      //调用获取用户信息函数，用于判断是否存在此用户
      const checkUser = createUserList().find(
        // 这里是映射吗？
        (item) => item.username === username && item.password === password,
        // find函数中的回调函数--作用？
      );
      //没有用户返回失败信息
      if (!checkUser) {
        // 需要对数据进行类型检查
        return { code: 201, data: { message: "账号或者密码不正确" } };
      }
      //如果正确 返回成功信息
      const { token } = checkUser;
      // 需要对数据进行类型检查
      return { code: 200, data: { token } };
    },
  },
  // 获取用户信息
  {
    url: "/api/user/info",
    method: "get",
    response: (request) => {
      //获取请求头携带token
      const token = request.headers.token;
      //查看用户信息是否包含有次token用户
      const checkUser = createUserList().find((item) => item.token === token);
      //没有返回失败的信息
      if (!checkUser) {
        return { code: 201, data: { message: "获取用户信息失败" } };
      }
      //如果有返回成功信息
      return { code: 200, data: { checkUser } };
    },
  },
];
