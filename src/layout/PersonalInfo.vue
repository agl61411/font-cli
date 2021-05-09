<template>
  <el-row type="flex" justify="space-between" align="middle" style="width: 150px;min-width: 150px">
    <el-avatar :size="50" class="avatar-container"></el-avatar>
    <el-dropdown trigger="hover"  @command="handleCommand">
      <h6 class="personal-name">{{info.nickname}}</h6>
      <template v-slot:dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-row>
</template>

<script>
import { useStore } from 'vuex';
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup () {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      info: store.getters['account/info']
    });

    const handleCommand = (command) => {
      switch (command) {
      case 'logout':
        logout();  
        break;
      default:
        break;
      }
    };

    const logout = () => {
      sessionStorage.clear();
      store.dispatch('account/resetState');

      router.push({
        path: '/login',
        query: {
          backUrl: route.fullPath
        }
      });
    };

    return {
      ...state,
      handleCommand
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