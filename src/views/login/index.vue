<!-- @format -->

<template>
  <!-- el-row 与div盒子属性一致-->
  <div class="login_container">
    <!-- el-row 相当于多属性的盒子元素 -->
    <el-row class="row">
      <!-- 布局的设置可以是大盒子内部添加两个列盒子，一个用于占位<实现简单的响应式>-一个用于设置表单组件 -->
      <el-col :span="12" :xs="0">用于占位</el-col>
      <!-- xs属性的含义：在屏幕宽度小于等于768px时  组件的响应式栅格数- 最大是24-->
      <el-col :span="12" :xs="24">
        <div class="login_form">
          <h1>HELLO</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form
            class="form"
            label-width="50px"
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleFormRef"
          >
            <el-form-item label="账号:" prop="username">
              <el-input prefix-icon="User" v-model="ruleForm.username" />
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input
                prefix-icon="lock"
                v-model="ruleForm.password"
                type="password"
                show-password="true"
              />
            </el-form-item>
            <el-form-item>
              <el-button class="form_button" @click="submitForm(ruleFormRef)"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import useloginStore from "../../store/modules/user";
// import { useRoute,useRouter } from "vue-router";
// import { storeToRefs } from 'pinia';
let loginstore = useloginStore();
//使用仓库的变量或方法时可以使用.运算符使用或者对数据进行解构；

const ruleFormRef = ref<FormInstance>();
interface formdata {
  password: string;
  username: string;
}

const ruleForm = reactive<formdata>({
  password: "",
  username: "",
});
//账号校验器：
// 参数：rule:any,value:string,callback:any
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("账号不能为空"));
  } else {
    callback();
  }
};
// 密码校验器
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("密码不能为空"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ validator: validateUsername, trigger: "blur" }],
  // validator: validatePass, trigger: 'blur'
  password: [{ validator: validatePassword, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      console.log("登录校验成功！");
      ElMessage({
        message: "校验成功",
        type: "success",
      });

      await loginstore.loginpost(ruleForm);
      // 一下代码并未执行；
      //  const $route = useRoute();
      //  const router = useRouter();
      //  const redirect = $route?.query?.redirect;
      //  push无法使用
      //  router.push({ path: (redirect as string) || "/home" });
      // 定言--可用类型多的变量被赋值给可用类型少的变量时 应将 多变量定言为固定类型变量
    } else {
      console.log("登录校验失败！！");
      ElMessage({
        message: "校验错误",
        type: "error",
      });
    }
  });
};
</script>

<style lang="scss" scoped>
$h1_size: 40px;
$h2_size: 25px;

.login_container {
  width: 100%;
  height: 100vh;
  background-color: pink;
}
.row {
  display: flex;
  flex-direction: row;
}
h1 {
  font-size: $h1_size;
  color: #fff;
}
h2 {
  font-size: $h2_size;
  color: #fff;
}
.login_form {
  position: absolute;
  margin-left: 30px;
  top: 20vh;
  background-color: rgb(97, 181, 154);
  padding: 20px;
  border-radius: 15px;
}
.form {
  width: 450px;
  margin-top: 20px;
}
.form_button {
  width: 150px;
  margin: 0 auto;
  background-color: #67c5ed;
  color: #fff;
  border: 0;
}
</style>
