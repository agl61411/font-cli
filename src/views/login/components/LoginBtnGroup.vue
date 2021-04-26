<template>
  <div>
    <div class="remember-forget">
      <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
      <el-button type="text" class="forget-btn">忘记密码</el-button>
    </div>
    <el-row type="flex" justify="space-between" style="margin-top: 5px">
      <el-col :span="11">
        <el-button class="common-btn">注册</el-button>
      </el-col>
      <el-col :span="11">
        <el-button type="primary" class="common-btn login-btn" :loading="loading" @click="onLogin">登录</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  setup (props, { emit }) {
    const form = inject('form');

    const onLogin = () => {
      emit('onLogin');
    };

    return {
      form,
      onLogin
    };
  }
};
</script>

<style scoped>
  .remember-forget {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .forget-btn {
    padding: 0px;
    min-height: 0px;
  }
</style>