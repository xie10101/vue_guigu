//设置函数用来封装 获取当前时间并返回的功能：
import { ref } from "vue";
export const getTime = () => {
  //获取时间，保存时间
  const message = ref<string>("");
  const time = new Date().getHours();
  if (time <= 9) {
    message.value = "早上好";
  } else if (time <= 12) {
    message.value = "上午好";
  } else if (time <= 18) {
    message.value = "下午好";
  } else {
    message.value = "晚上好";
  }
  return message.value;
};
