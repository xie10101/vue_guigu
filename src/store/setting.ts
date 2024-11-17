import { defineStore } from "pinia";
import { ref } from "vue";
const useTabbarStore = defineStore("Tabbar", () => {
  // 菜单折叠图标变量设置
  const fold = ref<boolean>(true);
  //设置函数实现仓库数据fold的改变；
  function changefold() {
    fold.value = !fold.value;
    console.log(fold.value);
  }
  //控制页面刷新
  const refresh = ref<boolean>(true);
  return {
    fold,
    changefold,
    refresh,
  };
});
export default useTabbarStore;
