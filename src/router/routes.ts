// import { menuroutes } from './routes2'
export const baseroutes = [
  {
    path: "/",
    redirect: "/login",
    meta: {
      title: "空白页",
      hidden: true,
      icon: "HomeFilled",
    },
  },
  // 对于二级路由的设置，跳转后的内容为二级路由绑定组件
  {
    path: "/login",
    // 无法使用@ 相对路径
    component: () => import("../views/login/index.vue"),
    name: "login",
    meta: {
      title: "登陆页",
      hidden: true,
    },
  },
  {
    path: "/home",
    // 地址栏显示--/homepage
    redirect: "/homepage",
    // 无法使用@ 相对路径
    component: () => import("../views/home/index.vue"),
    name: "home",
    meta: {
      title: "主页",
      icon: "Plus",
    },
    children: [
      // homepage:
      {
        path: "/homepage",
        component: () => import("../views/homepage/index.vue"),
        name: "homepage",
        meta: {
          title: "首页",
          icon: "HomeFilled",
        },
      },
    ],
  },
  // 数据大屏：
  {
    path: "/platform",
    component: () => import("../views/platform/index.vue"),
    name: "platform",
    meta: {
      title: "数据大屏",
      hidden: false,
      icon: "Apple",
    },
  },
  //权限管理：
  {
    path: "/user",
    component: () => import("../views/home/index.vue"),
    name: "user",
    meta: {
      title: "权限管理",
      hidden: false,
      icon: "Lock",
    },
    redirect: "/users",
    children: [
      {
        path: "/users",
        component: () => import("../views/user/users/index.vue"),
        name: "users",
        meta: {
          title: "用户管理",
          hidden: false,
          icon: "User",
        },
      },
      {
        path: "/role",
        component: () => import("../views/user/role/index.vue"),
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "UserFilled",
        },
      },
      {
        path: "/menu",
        component: () => import("../views/user/menu/index.vue"),
        meta: {
          title: "菜单管理",
          hidden: false,
          icon: "menu",
        },
      },
    ],
  },
  // 商品管理
  {
    path: "/product",
    component: () => import("../views/home/index.vue"),
    name: "product",
    meta: {
      title: "商品管理",
      hidden: false,
      icon: "Goods",
    },
    redirect: "/attr",
    children: [
      {
        path: "/attr",
        component: () => import("../views/product/attr/index.vue"),
        name: "attr",
        meta: {
          title: "属性管理",
          hidden: false,
          icon: "Coin",
        },
      },
      {
        path: "/trademark",
        component: () => import("../views/product/trademark/index.vue"),
        name: "trademark",
        meta: {
          title: "商标管理",
          hidden: false,
          icon: "Goods",
        },
      },
      {
        path: "/sku",
        component: () => import("../views/product/sku/index.vue"),
        name: "sku",
        meta: {
          title: "SKU管理",
          hidden: false,
          icon: "Pear",
        },
      },
      {
        path: "/spu",
        component: () => import("../views/product/spu/index.vue"),
        name: "spu",
        meta: {
          title: "SPU管理",
          hidden: false,
          icon: "Apple",
        },
      },
    ],
  },

  {
    path: "/404",
    // 无法使用@ 相对路径
    component: () => import("../views/404/404.vue"),
    name: "404",
    meta: {
      hidden: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    // 无法使用@ 相对路径
    redirect: "/404",
    name: "Any",
    meta: {
      hidden: true,
    },
  },
];
