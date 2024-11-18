<template>
  <div>
    <el-card class="top_card">
      <el-form :inline="true" class="form_top">
        <el-form-item label="用户名：">
          <el-input
            v-model="checkusername"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item style="right: 10px; position: absolute">
          <el-button type="primary" @click="Search" :disabled="!checkusername"
            >搜索</el-button
          >
          <el-button @click="Reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div>
        <el-button type="primary" @click="handleAddUser">添加用户</el-button>
        <el-popconfirm
          title="你确定要将这些用户删除吗"
          @confirm="checkedDelete"
        >
          <template #reference>
            <el-button type="warning" :disabled="selectionRows.length < 1"
              >批量删除</el-button
            >
          </template>
        </el-popconfirm>
      </div>
      <el-table
        border
        style="margin-top: 18px; margin-bottom: 18px"
        :data="userinfos?.records"
        @selection-change="handleSelected"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="#" type="index" width="50px"> </el-table-column>
        <el-table-column label="id" width="150px" prop="id"> </el-table-column>
        <el-table-column label="用户名字" width="150px" prop="name">
        </el-table-column>
        <el-table-column label="用户名称" prop="username"> </el-table-column>
        <el-table-column label="用户角色" prop="roleName"> </el-table-column>
        <el-table-column label="创建时间" prop="createTime"> </el-table-column>
        <el-table-column label="更新时间" prop="updateTime"> </el-table-column>
        <el-table-column label="操作" width="280px">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              icon="User"
              size="small"
              @click="handelAllocate(row)"
              >分配角色</el-button
            >
            <el-button
              type="warning"
              icon="Edit"
              size="small"
              @click="handleEdit(row)"
            >
              编辑</el-button
            >
            <el-popconfirm title="你确定要删除此用户吗" @confirm="Delete(row)">
              <template #reference>
                <el-button type="danger" icon="Delete" size="small"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器组件 -->
      <el-pagination
        v-model:current-page="pageon"
        v-model:page-size="size"
        :page-sizes="[3, 5, 7, 9]"
        size="default"
        background="true"
        layout="prev, pager, next, jumper,->,total,sizes"
        :total="userinfos?.total"
        @change="handleChange"
      />
    </el-card>

    <el-drawer v-model="drawer">
      <template #header>
        <h1>添加用户</h1>
      </template>
      <template #default>
        <div>
          <el-form :rules="rules" :model="addorupdateinfos" ref="ruleRef">
            <el-form-item label="用户姓名：" prop="name">
              <el-input
                placeholder="请输入用户姓名"
                v-model="addorupdateinfos.name"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户名称：" prop="username">
              <el-input
                placeholder="请输入用户名称"
                v-model="addorupdateinfos.username"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="用户密码：" prop="password">
              <el-input
                placeholder="请输入用户密码"
                v-model="addorupdateinfos.password"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="Save()">保存</el-button>
          <el-button type="primary" @click="Cancel">取消</el-button>
        </div>
      </template>
    </el-drawer>
    <el-drawer v-model="drawer2">
      <template #header>
        <h1>分配角色板</h1>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户名称">
            <el-input disabled="true" v-model="addorupdateinfos.username">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
              size="large"
            >
              全选
            </el-checkbox>
            <!-- 被选中的选项值会被push到一个数组中  -->
            <el-checkbox-group
              v-model="checkedRoles"
              @change="handleCheckedValueChange"
            >
              <!-- label  代表标签 称号  value 代表 动态绑定值  -->
              <el-checkbox
                v-for="(role, index) in assignrolesdata"
                :key="index"
                :label="role.id"
                size="large"
                border
                style="margin-bottom: 10px"
              >
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="Allocate">分配</el-button>
          <el-button type="primary" @click="cancelAllocate">取消</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import {
  UserInfos,
  UserInfosArr,
  Record,
  Rolelist,
  Role,
  AssignedRoles,
} from "../../../api/user/users/type";
import {
  addOrUpdateInfos,
  assignRoles,
  batchRemove,
  getUserInfos,
  getUserRoles,
  removeUser,
} from "../../../api/user/users";
import { ElMessage } from "element-plus";

let userinfos = ref<UserInfosArr>();
//当前页数：
const pageon = ref<number>(1);
const size = ref<number>(5);

//绑定抽屉的打开与关闭：
const drawer = ref<boolean>(false);
const drawer2 = ref<boolean>(false);

//添加用户信息绑定：
let addorupdateinfos = reactive<Record>({
  username: "",
  password: "",
  name: "",
});
// 表单组件 ：
let ruleRef = ref<any>();

//分配角色--多选框全选：
const checkAll = ref<boolean>(false);
//不确定状态：
const isIndeterminate = ref(false);

//获取到的角色信息
const assignrolesdata = ref<Role[]>([]);
//已选角色与将被选中的角色
const checkedRoles = ref<number[]>([]);
//设置绑定的搜索用户名称;
const checkusername = ref<string>("");
//被选中的删除id：
const selectionRows = ref<number[]>([]);

// 将获取数据操作进行封装：
const getInfos = async () => {
  const result: UserInfos = await getUserInfos(
    pageon.value,
    size.value,
    checkusername.value
  );
  if (result.code == 200) {
    userinfos.value = result.data;
    ElMessage({
      type: "success",
      message: "获取用户信息成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: "获取用户信息失败",
    });
  }
};
onMounted(async () => {
  getInfos();
});
//切换展示个数/页数时的回调 ：
const handleChange = async () => {
  getInfos();
};
//添加用户按钮的回调:
const handleAddUser = () => {
  //在执行其他逻辑前将对象清空:
  // Object.assign(addorupdateinfos, {
  //   name: "",
  //   username: "",
  //   password: "",
  // }); //值的浅拷贝
  // console.log(addorupdateinfos.id); //存在的
  addorupdateinfos = {
    name: "",
    username: "",
    password: "",
  };

  //此写法代表--
  drawer.value = true;
  //需要将表单项进行清空L:
  ruleRef.value.resetFields(); //方法1一
  //可以在nextTick：
  // nextTick(() => {
  //   ruleRef.value.clearValidate("name");
  //   ruleRef.value.clearValidate("username");
  //   ruleRef.value.clearValidate("password");

  // });
};

//抽屉-保存按钮的回调：
const Save = async () => {
  //返回一个promise对象 （分为失败与成功 ）
  await ruleRef.value.validate(); //异步执行后 返回正确的promise 对象 之后继续执行
  const result = await addOrUpdateInfos(addorupdateinfos);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: addorupdateinfos.id ? "更新用户成功" : "添加用户成功",
    });
    drawer.value = false;
    getInfos();
  } else if (result.code == 201 && !addorupdateinfos.id) {
    ElMessage({
      type: "warning",
      message: "用户已经存在",
    });
  } else {
    ElMessage({
      type: "error",
      message: addorupdateinfos.id ? "更新用户失败" : "添加用户成功",
    });
  }
};

//更新数据与添加数据结合:

//抽屉-取消按钮的回调
const Cancel = () => {
  drawer.value = false;
};
const validateName = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error("用户姓名不能为空"));
  } else {
    callback();
  }
};
// 校验规则的设置： 1. 将 form组件 绑定数据--：model;
// 2.将form组件 设置:rules ,为每个表单项 绑定prop 属性；
//3. 表单校验规则设置
const validateUsername = (rule: any, value: any, callback: any) => {
  if (!value) {
    //回调函数中传入错误对象来表示校验失败
    callback(new Error("用户名称不能为空"));
  } else if (value.trim().length < 5) {
    // 字符串长度 .length
    callback(new Error("用户名称不能小于五个字符"));
  } else {
    callback();
  }
};
const validatePassword = (rule: any, value: any, callback: any) => {
  console.log(value);
  if (!value) {
    callback(new Error("密码不能为空"));
  } else if (value.trim().length < 6) {
    callback(new Error("用户密码不能小于六个字符"));
  } else {
    callback();
  }
};
//表单校验规则： //对象//数组 //对象
const rules = {
  name: [{ validator: validateName, required: true, trigger: "blur" }],
  username: [{ required: true, trigger: "blur", validator: validateUsername }],
  password: [{ required: true, trigger: "blur", validator: validatePassword }],
};

//修改 编辑回调：
const handleEdit = (row: Record) => {
  //将信息获取：
  Object.assign(addorupdateinfos, row);
  //打开抽屉：
  drawer.value = true;
};
//删除用户信息的回调 ：
const Delete = async (row: Record) => {
  const result: any = await removeUser(row.id);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除用户成功",
    });
    getInfos();
  } else {
    ElMessage({
      type: "error",
      message: "删除用户失败",
    });
  }
};
// 分配角色的回调:
const handelAllocate = async (row: any) => {
  // 角色信息进行获取 ：
  const result: Rolelist = await getUserRoles(row.id);
  console.log(result);
  assignrolesdata.value = result.data.allRolesList;
  //将已选角色 放于 checkedrole：
  // map函数：不破坏原始数组 将回调函数返回值构成的新数组进行返回；
  checkedRoles.value = result.data.assignRoles.map((role) => role.id);
  //打开抽屉
  drawer2.value = true;
  addorupdateinfos.username = row.username;
  addorupdateinfos.id = row.id;
  // 将上次选择信息进行删除 ：
  checkAll.value = false;
  isIndeterminate.value = false;
};

//////待选优先级 大于 全选
//多选框全选改变回调：
const handleCheckAllChange = () => {
  isIndeterminate.value = false;
  //////待选优先级 大于 全选
  if (checkAll.value) {
    //不能写死--
    checkedRoles.value = [0, 1, 2, 3, 4, 5];
  } else {
    checkedRoles.value = [];
  }
};
//多选框中被选项改变回调：
const handleCheckedValueChange = () => {
  if (checkedRoles.value.length == 6) {
    checkAll.value = true;
    isIndeterminate.value = false;
  } else if (checkedRoles.value.length == 0) {
    checkAll.value = false;
    isIndeterminate.value = false;
  } else {
    isIndeterminate.value = true;
    // checkAll.value = false;
  }
};

//分配角色按钮回调：
const Allocate = async () => {
  console.log(checkedRoles.value);
  // 请求数据进行收集：
  const data = ref<AssignedRoles>({
    userId: addorupdateinfos.id as number,
    roleIdList: checkedRoles.value,
  });
  const result = await assignRoles(data.value);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "分配角色成功",
    });
    drawer2.value = false;
    getInfos();
  } else {
    ElMessage({
      type: "error",
      message: "分配角色失败",
    });
  }
};
const cancelAllocate = () => {
  drawer2.value = false;
};

//搜索按钮的回调
const Search = () => {
  getInfos();
};
//重置按钮的回调: --使用封装的刷新回调;
import useTabbarStore from "../../../store/setting";
const TabbarStore = useTabbarStore();
const Reset = () => {
  // checkusername.value = "";
  // getInfos(); //此方法会导致产生信息提示;
  TabbarStore.refresh = false; //实质是在展示面外层组件 监视 watch refresh变化 --执行组件的重新挂载
};

//获取选中id
const handleSelected = (data: Record[]) => {
  selectionRows.value = data.map((item) => item.id as number);
};
//批量删除的回调:
const checkedDelete = async () => {
  const result = await batchRemove(selectionRows.value);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "批量删除成功",
    });
    getInfos();
  } else {
    ElMessage({
      type: "error",
      message: "批量删除失败",
    });
  }
};
</script>

<style scoped lang="scss">
.top_card {
  height: 70px;
  margin-bottom: 20px;
}
.form_top {
  display: flex;
  position: relative;
}
</style>
