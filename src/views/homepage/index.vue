<template>
  <div class="body">
    <el-card>
      <el-avatar shape="square" :size="90" :src="loginStore.userinfos.avatar" />
      <div>
        <span style=""> 欢迎来到花生壳de主页</span>
      </div>
    </el-card>
    <el-card style="margin-top: 20px">
      <div style="display: flex">
        <el-calendar
          style="display: block; width: 50%; height: 100%"
          v-model="value"
        />
        <!-- 暂时使用静态 -->
        <el-image
          style="width: 50%; height: 100%; display: block"
          src="../../../public/homepage1.jpeg"
          fit="fill"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useloginStore from "../../store/modules/user";
const loginStore = useloginStore();
import { ref } from "vue";
const value = ref(new Date());
</script>

<style scoped lang="scss">
span {
  font-family: "Comic Sans MS", cursive, sans-serif;
  //字体倾斜
  font-style: italic;
  color: grey;
}
</style>
