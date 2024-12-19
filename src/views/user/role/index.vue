<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from "vue";
import {
  reqAllRole,
  getPermission,
  reqAddOrUpdateRole,
  reqAddPermission,
} from "../../../api/role";
import type {
  RoleResponseData,
  Records,
  RoleData,
  MenuData,
} from "../../../api/role/type";
import { ElMessage } from "element-plus";
const currentpage = ref<number>(1);
const pagesize = ref<number>(10);
//点击分页器执行的回调：
const handleChange = () => {
  //获取列表：
  getRoleList(currentpage.value, pagesize.value);
};

//单独封装函数：//默认值参数
const getRoleList = async (page = 1, size: number) => {
  currentpage.value = page;
  const res: RoleResponseData = await reqAllRole(page, size, roleName.value);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: !roleName.value ? "获取成功" : "搜索成功",
    });
    allRole.value = res.data.records;
    //
    total.value = res.data.total;
  } else {
    ElMessage({
      type: "error",
      message: !roleName.value ? "获取失败" : "搜索失败",
    });
  }
};
//搜索用户的关键字：
const roleName = ref<string>("");

onMounted(() => {
  getRoleList(1, 10);
});

//存储已有的全部职位：
let allRole = ref<Records>([]);

//总数：
let total = ref<number>(0);

//搜索按钮的回调
const Search = () => {
  getRoleList(1, 10);
  roleName.value = "";
};

import useTabbarStore from "../../../store/setting";

const TabbarStore = useTabbarStore();
//重置按钮的回调：
const Reset = () => {
  // userName.value = "";
  // getRoleList(1, 10);
  TabbarStore.refresh = !TabbarStore.refresh;
};

// 对话框：
const dialogVisible = ref<boolean>(false);
// 添加职位按钮的回调：
const AddRoleBut = () => {
  dialogVisible.value = true;
  Object.assign(RoleParams, { roleName: "", id: 0 });
  //清空表单校验：
  nextTick(() => {
    form.value.clearValidate("roleName");
  });
};
//编辑按钮的回调：
const EditRole = (row: any) => {
  nextTick(() => {
    form.value.clearValidate("roleName");
  });
  dialogVisible.value = true;
  Object.assign(RoleParams, row);
};
//收集新增岗位的数据：
const RoleParams = reactive({
  roleName: "",
  id: 0,
});
// 自定义校验规则：
const validateRoleName = (rule: any, value: string, callback: any) => {
  console.log(rule);
  console.log(value);
  if (value === "") {
    callback(new Error("请输入角色名称"));
  } else if (value.length < 3) {
    callback(new Error("角色名称不能少于3个字符"));
  } else {
    callback();
  }
};
// 收集新增岗位的表单验证规则： //需要设置多种校验规则
const RoleRules = reactive({
  roleName: [
    {
      required: true,
      message: "请输入角色名称",
      trigger: "blur",
      validator: validateRoleName,
    },
  ],
});
const form = ref();
//确认添加按钮的回调：
const save = async () => {
  await form.value.validate(); //返回成功继续执行 返回失败停止执行
  //添加职位：
  const res = await reqAddOrUpdateRole(RoleParams);
  if (res.code == 200) {
    console.log(RoleParams.id);
    ElMessage({
      type: "success",
      message: !RoleParams.id ? "添加成功" : "修改成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: !RoleParams.id ? "添加失败" : "修改成功",
    });
  }
  dialogVisible.value = false;
  //再次获取 //需要区分 如果是更新之后--需要留在原先页面
  getRoleList(RoleParams.id ? currentpage.value : 1, pagesize.value);
};
//抽屉组件绑定：
const drawer = ref<boolean>(false);
//定义 数组存储角色权限数据：
let menuArr = ref<MenuData[]>([]);

//过滤菜单数组项：
const filterMenu = (arr: MenuData[], selectedmenu: number[]) => {
  //递归时不能新建数组-- 否则会重复创建
  //使用 filter 函数进行 数组过滤执行--便于对数组中的每个元素进行操作：
  // arr.filter((item: MenuData) => {
  //   console.log("11");
  //   if (item.select && item.level == 3) {
  //     arr_id.value.push(item.id);//?
  //   } else {
  //     if (item.children) {
  //       console.log("22");
  //       // 函数递归对子数组依次过滤
  //       filterMenu(item.children);
  //     }
  //   }
  // });
  //forEach 遍历执行：
  arr.forEach((item: MenuData) => {
    if (item.select && item.level == 4) {
      selectedmenu.push(item.id);
    }
    if (item.children && item.children.length > 0) {
      //空数组代表真？
      // 函数递归对子数组依次过滤
      filterMenu(item.children, selectedmenu);
    }
  });
  // 此时递归的方法--不能设置返回值
  return 1;
};

//分配权限按钮回调：
const setPermission = async (row: RoleData) => {
  drawer.value = true;
  Object.assign(RoleParams, row);
  const res = await getPermission(row.id as number);
  if (res.code == 200) {
    menuArr.value = res.data;
    filterMenu(menuArr.value as MenuData[], selectedmenu.value);
  }
};

//树形控件绑定数据：
const defaultProps = {
  children: "children",
  label: "name",
};

//新建数组存储 选中的菜单数据：---仅存储四级选框的选项数据
let selectedmenu = ref<number[]>([]);

// import { getCheckedKeys } from "@/utils/tree";
//获取选中节点的 回调：

//确认按钮点击回调：
const confirmClick = async () => {
  //职位id 权限id 数组
  const roleId = RoleParams.id;
  //传值 当前选中的id数组
  //获取全选id ：
  let arr = tree.value.getCheckedKeys();
  //获取半选id ：
  let arr2 = tree.value.getHalfCheckedKeys();
  let permissionId = [...arr, ...arr2];
  const res = await reqAddPermission(roleId, permissionId);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "分配权限成功",
    });
    drawer.value = false;
    window.location.reload();
  } else {
    ElMessage({
      type: "error",
      message: "分配权限失败",
    });
  }
};

//树状控件绑定值 ：  --使用 组件方法时 需要获取 组件的实例
const tree = ref();
</script>
<template>
  <el-card>
    <el-form inline="true" style="display: flex">
      <el-form-item label="角色：" style="margin-right: 120px">
        <el-input placeholder="请输入角色名称" v-model="roleName"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="search"
          :disabled="!roleName"
          @click="Search"
          >搜索</el-button
        >
        <el-button @click="Reset">重置 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 20px">
    <el-button
      icon="plus"
      type="primary"
      style="margin-bottom: 20px"
      @click="AddRoleBut"
    >
      添加角色</el-button
    >
    <el-table border :data="allRole">
      <el-table-column type="index" label="#" width="120px" />
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column
        label="创建时间"
        show-overflow-tooltip
        prop="createTime"
      ></el-table-column>
      <el-table-column
        label="更新时间"
        show-overflow-tooltip
        prop="updateTime"
      ></el-table-column>
      <el-table-column label="操作" width="300">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            icon="user"
            size="small"
            @click="setPermission(row)"
            >分配权限</el-button
          >
          <el-button type="primary" size="small" @click="EditRole(row)"
            >编辑</el-button
          >
          <el-button type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentpage"
      v-model:page-size="pagesize"
      :page-sizes="[10, 15, 20]"
      background
      layout=" prev, pager, next, jumper ,->,total, sizes"
      :total="total"
      @change="handleChange"
    />
  </el-card>
  <!-- 添加职位与更新已有职位的结构：对话框 -->
  <el-dialog
    v-model="dialogVisible"
    :title="!RoleParams.id ? '添加职位' : '更新职位'"
    style="height: 300px"
  >
    <el-form :model="RoleParams" :rules="RoleRules" ref="form">
      <el-form-item label="角色名称" prop="roleName" style="margin-top: 40px">
        <el-input
          v-model="RoleParams.roleName"
          placeholder="请输入职位名称"
          prop="roleName"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="save">确定</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          取消
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 抽屉组件：分配职位的菜单的权限与按钮的权 限-->
  <el-drawer v-model="drawer" title="分配权限">
    <!-- 树形控件的使用 -->
    <el-tree
      ref="tree"
      style="max-width: 600px"
      :data="menuArr"
      show-checkbox
      node-key="id"
      :default-checked-keys="selectedmenu"
      :props="defaultProps"
      default-expand-all
    />
    <!-- :props --数据展示字段的设置 -->
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="confirmClick">确认</el-button>
        <el-button @click="drawer = false">取消</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss"></style>
