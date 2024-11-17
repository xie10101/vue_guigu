/** @format */

//属性管理部分仓库设置：
import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from "../../api/product/attr";
import { ref } from "vue";
// import { nextTick } from "vue";
import { CategoryObj, CategoryResponseData } from "../../api/product/attr/type";
const useCategoryStore = defineStore("Category", () => {
  const arr_c1 = ref<CategoryObj[]>([]);
  //获取到的第一分类接口中所有分类：
  const selected_c1 = ref<number>();
  // 选择的第一分类项的值
  //保存第二分类内容：
  const arr_c2 = ref<CategoryObj[]>([]);
  //保留选中的二级分类：
  const selected_c2 = ref<number>();
  //保存第三分类数据：
  const arr_c3 = ref<CategoryObj[]>([]);
  //保留选中的三级分类id：
  const selected_c3 = ref<number>();
  // const selected_c3 = ref<number>();
  //获取第一分类接口：
  const getC1 = async () => {
    const result: CategoryResponseData = await reqC1();
    if (result.code == 200) {
      arr_c1.value = result.data;
      console.log(arr_c1.value);
    } else {
      return Promise.reject(new Error(result.message));
      // 这块抛出的错误---响应拦截会报错？
    }
  };
  const getC2 = async () => {
    const result: CategoryResponseData = await reqC2(selected_c1.value);
    if (result.code == 200) {
      arr_c2.value = result.data;
    } else {
      return Promise.reject(new Error(result.message));
      // 这块抛出的错误---响应拦截会报错？
    }
  };
  const getC3 = async () => {
    const result: CategoryResponseData = await reqC3(selected_c2.value);
    if (result.code == 200) {
      arr_c3.value = result.data;
      console.log(result.data);
    } else {
      return Promise.reject(new Error(result.message));
      // 这块抛出的错误---响应拦截会报错？
    }
  };
  //获取对应属性？
  return {
    getC1,
    getC2,
    arr_c1,
    selected_c1,
    arr_c2,
    selected_c2,
    getC3,
    arr_c3,
    selected_c3,
  };
});

export default useCategoryStore;
