export const menuroutes = [
  {
    path: "/home/userManage",
    component: () => import("../views/user/index.vue"),
    meta: {
      title: "用户管理",
      hidden: true,
    },
  },
  {},
  {},
];
