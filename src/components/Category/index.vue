<!-- @format -->
<!-- 设置全局 -->
<template>
  <el-card style="height: 80px">
    <el-form style="display: flex">
      <el-form-item label="一级分类" style="width: 250px; margin-right: 10px">
        <el-select
          v-model="categoryStore.selected_c1"
          :disabled="showchange"
          @change="handleC2"
        >
          <!-- pinia仓库中的数据是可以与组件双向绑定的 -->
          <el-option
            v-for="(c1, index) in categoryStore.arr_c1"
            :key="index"
            :label="c1.name"
            :value="c1.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" style="width: 250px; margin-right: 10px">
        <el-select
          v-model="categoryStore.selected_c2"
          :disabled="showchange"
          @change="handleC3"
        >
          <!-- 并非动态绑定？ -->
          <el-option
            v-for="c2 in categoryStore.arr_c2"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" style="width: 250px">
        <el-select v-model="categoryStore.selected_c3" :disabled="showchange">
          <el-option
            v-for="c3 in categoryStore.arr_c3"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
defineOptions({
  name: "Category",
  inheritAttrs: false,
});
// ？是否合适 在子组件中引入store
import useCategoryStore from "../../store/modules/category";
import { onMounted } from "vue";
// import { ref } from "vue";
const categoryStore = useCategoryStore();
onMounted(() => {
  categoryStore.getC1();
});
//获取第二分类；
const handleC2 = () => {
  //一级分类改变时再次选择二级时需要清除 二三选择器绑定的值
  categoryStore.selected_c2 = undefined;
  categoryStore.selected_c3 = undefined;
  categoryStore.getC2();
};
//获取第三分类：
const handleC3 = () => {
  //一级分类改变时再次获取二级时需要清除 选择器绑定的值
  categoryStore.selected_c3 = undefined;
  categoryStore.getC3();
};
//控制分类的可选
defineProps(["showchange"]);
</script>

<style></style>
