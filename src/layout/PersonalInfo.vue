<template>
  <el-row type="flex" justify="space-between" align="middle" style="width: 150px;min-width: 150px">
    <el-avatar :size="50" class="avatar-container"></el-avatar>
    <el-dropdown trigger="hover">
      <h6 class="personal-name">{{info.nickname}}</h6>
      <template v-slot:dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
          <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-row>
</template>

<script>
import { useStore } from 'store';
import { reactive } from 'vue';
export default {
  setup () {
    const store = useStore();
    const state = reactive({
      info: store.getters['account/info']
    });
    return {
      ...state
    };
  }
};
</script>

<style scoped>
  .avatar-container {
    margin-right: 10px;
  }

  .personal-name {
    color: rgb(255, 255, 255);
    margin: 0;
    width: 90px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>