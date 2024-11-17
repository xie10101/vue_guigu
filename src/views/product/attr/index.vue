<!-- @format -->

<template>
  <div>
    <Category :showchange="showchange"></Category>
    <el-card style="margin-top: 20px">
      <div v-show="!showchange">
        <el-button
          type="primary"
          icon="plus"
          style="margin-bottom: 20px"
          :disabled="!CategoryStore.selected_c3"
          @click="toAddAttrs"
          >添加平台属性</el-button
        >
        <el-table border :data="attrslist">
          <el-table-column
            label="序号"
            type="index"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="130px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template v-slot="{ row }">
              <el-tag
                style="margin-right: 8px"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template v-slot="{ row }">
              <el-button type="warning" icon="Edit" @click="handleEdit(row)">
              </el-button>
              <el-button type="danger" icon="Delete" @click="handleDele(row)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="showchange">
        <!-- 块级元素会独占一行 -->
        <!-- 行内块元素 可以一行放置多个 -->
        <!-- form 属性 inline="true" -->
        <el-form :inline="true">
          <el-form-item :inline="true" label="属性名称:">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrscontent.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="plus"
          @click="addAttrsContents"
          :disabled="!attrscontent.attrName.trim()"
          >添加属性值</el-button
        >
        <el-button @click="clearAttrName"> 清空名称</el-button>
        <el-table
          border
          :data="attrscontent.attrValueList"
          style="margin-top: 20px; margin-bottom: 20px"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="新增属性值" prop="valuename">
            <template v-slot="{ row, $index }">
              <div style="display: flex">
                <div>属性值{{ $index + 1 }}:</div>
                <!-- ref  -->
                <el-input
                  :ref="
                    (item: any) => {
                      inputArr[$index] = item;
                    }
                  "
                  label="1231"
                  name="qeqe"
                  style="width: 100px; margin-left: 10px"
                  v-model="attrscontent.attrValueList[$index].valueName"
                  v-show="!row.flag"
                  @blur="handleBlur(row)"
                ></el-input>
                <div v-show="row.flag" @click="handlerinput(row, $index)">
                  {{ attrscontent.attrValueList[$index].valueName }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作属性">
            <template v-slot="{ $index }">
              <el-button
                type="danger"
                icon="delete"
                @click="delAttrContent($index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="handleAddAttrs"
          :disabled="
            !attrscontent.attrName.trim() || !attrscontent.attrValueList[0]
          "
          >确认添加</el-button
        >
        <el-button @click="Cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick } from "vue";
import Category from "../../../components/Category/index.vue";
import useCategoryStore from "../../../store/modules/category";
const CategoryStore = useCategoryStore();
import {
  addOrUpdateAttrs,
  deleteAttrs,
  reqAttrs,
} from "../../../api/product/attr";
import { CategoryList } from "../../../api/product/attr/type";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
// 获取属性--当三级分类id获取时

//属性列表：--进行展示
const attrslist = ref<CategoryList[]>([]);
//对三级分类进行判断-1 发请求获取 0 将数据清空代表 一级分类改变
watch(
  () => CategoryStore.selected_c3,
  () => {
    //在一级分类改变时  --三级与二级的id清空 不发请求
    if (!CategoryStore.selected_c3) {
      attrslist.value = [];
    } else {
      getAttrs();
    }
  },
);
//监视 watch--
// 结构失败
//
const { selected_c1, selected_c2, selected_c3 } = storeToRefs(CategoryStore); //stroreToRefs 用于解构对象中嵌套数据--保持响应式 调用时 需要使用 .value
//请求三级分类属性函数
const getAttrs = async () => {
  const result = await reqAttrs(
    selected_c1.value,
    selected_c2.value,
    selected_c3.value,
  );
  if (result.code == 200) {
    attrslist.value = result.data;
    console.log(attrslist.value);
    ElMessage({
      type: "success",
      message: "获取商品属性成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: "获取商品属性失败",
    });
    return Promise.reject(new Error(result.message));
  }
};
//控制 carda中内容的改变：
const showchange = ref<boolean>(false);
//添加新属性按钮回调
const toAddAttrs = () => {
  showchange.value = true;
  //将获取到的三级分类id赋值
  attrscontent.categoryId = CategoryStore.selected_c3;
  //将属性名 属性值列表清空
  attrscontent.attrName = "";
  attrscontent.attrValueList = [];
};
// 取消按钮回调
const Cancel = () => {
  showchange.value = false;
};
//修改添加页面 --table数据：
const attrscontent = reactive<CategoryList>({
  attrName: "",
  categoryId: 1,
  categoryLevel: 3,
  attrValueList: [],
});
//添加属性值按钮回调
const addAttrsContents = () => {
  attrscontent.attrValueList.push({
    valueName: "",
    flag: false,
  });
  //获取焦点：
  nextTick(() => {
    inputArr.value[attrscontent.attrValueList.length - 1].focus();
  });
};
// 清空按钮回调
const clearAttrName = () => {
  //清空输入款数据：
  attrscontent.attrName = "";
  attrscontent.attrValueList = [];
};
// 属性的添加或修改
const handleAddAttrs = async () => {
  //将输入框数据赋值 --请求对象：
  // 单独将
  // 此处冗杂
  const result = await addOrUpdateAttrs(attrscontent);
  if (result.code == 200) {
    console.log(result);
    if (attrscontent.id) {
      console.log(attrscontent.id);
      ElMessage({
        type: "success",
        message: "修改属性成功",
      });
      // 在进行一次修改时需要把其id进行删除（用于进行下次有关id的判断）
      attrscontent.id = undefined;
    } else {
      ElMessage({
        type: "success",
        message: "添加属性成功",
      });
    }
  }
  //返回到展示组件
  showchange.value = false;
  //再次请求：
  getAttrs();
};
// tabel删除按钮操作
const delAttrContent = (index: number) => {
  attrscontent.attrValueList.splice(index, 1);
  // 下标索引
};

//输入框焦点消失的回调：
const handleBlur = (row: any) => {
  // 为空判断
  if (row.valueName.trim() != "") {
    const judge = attrscontent.attrValueList.find((item) => {
      if (item != row && item.valueName == row.valueName) {
        return true;
      } else {
        return false;
      }
    });
    if (judge) {
      ElMessage({
        type: "error",
        message: "属性值重复",
      });
      row.valueName = "";
      return 1;
    }
    row.flag = true;
    //不重复判断
  } else {
    ElMessage({
      type: "error",
      message: "请输入有效属性值",
    });
  }
};
//输入框自动聚焦的实现:
//设置输入框组件数组
const inputArr = ref<any>([]);
//ref 回调函数执行时机 当组件产生/销毁时
// 输入框自动聚焦实现
const handlerinput = (row: any, $index: number) => {
  row.flag = false;
  nextTick(() => {
    inputArr.value[$index].focus();
  });
};
//展示页 编辑按钮回调
const handleEdit = (row: any) => {
  showchange.value = true;
  // 使用Object.assign--此方法属于对对象的浅拷贝：
  Object.assign(attrscontent, JSON.parse(JSON.stringify(row)));
};
//删除属性回调：
const handleDele = async (row: any) => {
  const result = await deleteAttrs(row.id);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    // 重新加载页面：
    getAttrs();
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};
</script>

<style scoped lang="scss">
// 宽度不能写死；
</style>
