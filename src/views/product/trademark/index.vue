<!-- @format -->

<template>
  <div>
    <el-card>
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button type="primary" size="default" @click="addTrademark" icon="Plus"
        >添加品牌</el-button
      >
      <!--table：
      ---border:可以设置表格纵向是否存在边框；
      table-column
      --label：某一个列表；
      --width：设置这列的宽度；
      --align：设置 这一列对齐方式
      --:data:设置table绑定数据
      -- type-index 序号,selectin多选框,expand--扩展
       -->
      <!-- 表格组件：用于展示已有的品牌数据 -->
      <el-table style="margin: 10px 0px" border :data="trademarkArr">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
          prop="index"
        ></el-table-column>
        <!-- 表单项文字的宽度 -->
        <el-table-column label="品牌名称">
          <!-- 尝试使用作用域插槽--常常自定义数据--增加样式 -->
          <template v-slot="{ row }">
            <!-- row 代表每一行所绑定的数据 -->
            <!-- $index 代表每一列的索引号 从0 开始 -->
            <!--column -代表当前列的数据  -->
            <pre style="color: brown">{{ row.tmName }}</pre>
          </template>
        </el-table-column>

        <el-table-column label="品牌LOGO" align="center">
          <template v-slot="{ row }">
            <el-image
              :src="row.logoUrl"
              style="width: 100px; height: 100px"
            ></el-image>
          </template>
        </el-table-column>

        <el-table-column label="品牌操作">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTradeMark(row)"
            ></el-button>
            <el-popconfirm
              title="你确定删除这个品牌吗？"
              @confirm="confirmRemove(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 组件中model属性 -->
      <!--
      pagination 
      v-model:current-page:设置分页器与当前页码
      v-model:page-size:设置每一页展示数据的条数
      page-sizes: 用于设置下拉菜单的数据--每页条数
      background:设置分页器按钮背景的颜色
      layout：静态组件结构的设置：    箭头将子组件顶到一边
       layout=" prev, pager, next, jumper,->,total, sizes,"
       -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        size="small"
        background
        layout=" prev, pager, next, jumper,->,total, sizes,"
        :total="total"
        @size-change="sizeChange"
        @current-change="getHasTrademark"
      />
    </el-card>
    <!-- 对话框组件设置 -->
    <!-- dialog ---title 属性是控制对话框的标题 --动态的-->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <!-- form组件  form-item 组件-->
      <!-- 组件绑定属性--：model -->
      <el-form :rules="rules" :model="trademarkParams" ref="formRef">
        <!-- form -item中label属性--组件标题 -->
        <!-- 输入框组件宽度样式的修改应在 form item 组件外部设置 -->
        <el-form-item
          label="品牌名称"
          prop="tmName"
          style="width: 80%"
          label-width="80px"
        >
          <el-input
            placeholder="请您输入品牌的名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <!-- 上传图片需要  服务器接口地址 有后端处理保存 -->
          <!-- 此上传接口不能使用 -->
          <!-- 上传文件之前的考虑---beforeUpload 上传文件的格式与大小 -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <img
              class="avatar"
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽 -->
      <template #footer>
        <el-button type="primary" size="default" @click="Confirm"
          >确认</el-button
        >
        <el-button type="primary" size="default" @click="Cancel"
          >取消</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue";
import {
  reqHasTrademark,
  reqAddOrUpdateTradeMark,
  reqRemoveTradeMark,
} from "../../../api/product/trademark";
import type {
  Records,
  TradeMark,
  TradeMarkResponseData,
} from "../../../api/product/trademark/type";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
//当前页面
let pageNo = ref<number>(1);
//定义每一页展示多少条数据：
let limit = ref<number>(3);
//存储已有品牌数据的总数：
let total = ref<number>(10);
//存储已有品牌的数据：
let trademarkArr = ref<Records>([]); //默认空数组
//对话框组件的显示隐藏：
let dialogFormVisible = ref<boolean>(false);
//定义收集新增品牌数据;
let trademarkParams = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});
const formRef = ref();
// 校验函数包含 三个参数： rule , value , callback
const validatorTmName = (rule: any, value: any, callback: any) => {
  console.log(rule);
  if (value.length >= 2) {
    callback();
  } else {
    callback(new Error("品牌名称位数大于等于两位"));
  }
};
//品牌logo 图片的自定义校验规则：
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  console.log(rule);
  if (value) {
    callBack();
  } else {
    callBack(new Error("请务必上传商标图片"));
  }
};
// 定义表单校验规则：
const rules = {
  tmName: [
    //require: 这个字段务必校验，表单项前面出来五角星；
    //trigger： 代表触发校验规则时机[blur、change];
    { require: true, trigger: "blur", validator: validatorTmName },
  ],
  logoUrl: [{ require: true, trigger: "change", validator: validatorLogoUrl }],
};
//将获取已有品牌的接口封装未一个函数：在任何情况下获取数据,调用此函数即可;
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager; //回调函数执行时前期参数？之后带？
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  );
  if (result.code == 200) {
    //存储已有品牌的总个数
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
    console.log(trademarkArr.value);
  }
};
//这个自定义事件，分页器组件会将下拉菜单选中过的数据返回
//当下拉菜单发生变换的时候触发此方法
const sizeChange = () => {
  //当前每一页的数据量发生变化的时候，当前页码归1
  // pageNo.value=1;
  getHasTrademark(trademarkParams.id ? pageNo.value : 1);
};

//组件挂载完毕的钩子--发一次请求，获取第一页，一页三个已有品牌
onMounted(() => {
  getHasTrademark();
});
// 添加品牌按钮执行的回调：
const addTrademark = () => {
  //对话框显示
  dialogFormVisible.value = true;
  //将数据清空：
  trademarkParams.id = undefined;
  trademarkParams.tmName = "";
  trademarkParams.logoUrl = "";
  //方法一：
  // 对校验提示的清空：
  // formRef.value?.clearValidate("tmName");
  // formRef.value?.clearValidate("logoUrl");
  //使用可选链可以防止第一次点击按钮时 组件未渲染时报错
  //方法二: //异步渲染后执行
  nextTick(() => {
    formRef.value.clearValidate("tmName");
    formRef.value.clearValidate("logoUrl");
  });
};
//上传图片之前触发的回调：
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  // rawFile 上传文件对象 {  主要的三个属性 ： name： size: type: }
  console.log(rawFile);
  // 要求:上传文件格式 图片 png jpg gif ；小于40mb
  if (
    rawFile.type == "image/png" ||
    rawFile.type == "image/jpg" ||
    rawFile.type == "image/jpeg" ||
    rawFile.type == "iamge/gif"
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "上传文件大小大于4MB",
      });
    }
    return true;
  } else {
    ElMessage({
      type: "error",
      message: "上传文件格式务必为PNG|JPG|GIF",
    });
    return false;
  }
};
// 上传成功后的回调：
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile,
) => {
  // response --上传图片后端返回的数据响应信息
  console.log(response);
  // 上传图片信息--包含响应信息
  console.log(uploadFile);
  trademarkParams.logoUrl = response.data;
  //单独设置函数将校验信息进行清除
  formRef.value.clearValidate("logoUrl");
};
//添加品牌 -确认
const Confirm = async () => {
  // 对整个表单项进行校验--便于 对后续进行选择执行；
  await formRef.value.validate();
  //console.log(formRef.value.validate())//返回rejected promise 对象
  const result = await reqAddOrUpdateTradeMark(trademarkParams);
  if (result.code == 200) {
    //
    ElMessage({
      type: "success",
      message: trademarkParams.id ? "修改品牌成功" : "添加品牌成功",
    });
    dialogFormVisible.value = false;

    getHasTrademark();

    // 仅在添加品牌成功之后进行全部品牌的再获取
  } else {
    ElMessage({
      type: "error",
      message: trademarkParams.id ? "修改品牌失败" : "添加品牌失败",
    });
  }
};
//对话框-取消
const Cancel = () => {
  dialogFormVisible.value = false;
};
//修改已有品牌的按钮的回调：
const updateTradeMark = (row: TradeMark) => {
  //row值代表
  dialogFormVisible.value = true;
  // ES6语法合并对象:
  // 对象属性的动态添加：--
  Object.assign(trademarkParams, row);
  // 新增品牌没有id 但是已有品牌存在id（后端设值）
  nextTick(() => {
    formRef.value.clearValidate("tmName");
    formRef.value.clearValidate("logoUrl");
  });
};

//删除确认时的回调：
const confirmRemove = async (id: number) => {
  //设置
  const result = await reqRemoveTradeMark(id);
  if (result.code == 200) {
    //
    ElMessage({
      type: "success",
      message: "删除品牌成功",
    });
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    ); //回到第一页
  } else {
    ElMessage({
      type: "error",
      message: "删除品牌失败",
    });
  }
};
//删除
</script>

<!--  -->
<style scoped>
/* 头像的 */
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);

  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
