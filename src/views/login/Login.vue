<!--
* @Description: 登录页
* @Date 2021/04/08 09:49
* @Author L.G.Y
-->
<template>
  <div class="login-page">
    <el-card class="login-card">
      <el-form ref="elForm" :model="form" label-width="auto" hide-required-asterisk>
        <login-form />
      </el-form>
      <login-btn-group :loading="loading" @onLogin="onLogin"/>
    </el-card>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  toRefs,
  provide
} from 'vue';

import {
  useRouter
} from 'vue-router';

import LoginForm from './components/LoginForm.vue';
import LoginBtnGroup from './components/LoginBtnGroup';

export default {
  components: { LoginForm, LoginBtnGroup },
  setup () {
    const elForm = ref();
    const router = useRouter();

    const state = reactive({
      form: {
        username: '',
        password: '',
        loginType: 'PASSWORD', // 密码：PASSWORD 验证吗：CAPTCHA
        mobile: '',
        captcha: '',
        rememberMe: true
      },
      loading: false
    });

    provide('form', state.form);

    const onLogin = () => {
      elForm.value.validate(valid => {
        if (valid) {
          _onLogin();
        }
      });
    };

    const _onLogin = () => {
      state.loading = true;

      console.log('-----------接口调用------------');
      setTimeout(() => {
        // TODO 登录接口调用
        router.push('/about');
        state.loading = false;
      }, 2000);
    };

    return {
      elForm,
      ...toRefs(state),
      onLogin
    };
  }
};
</script>

<style scoped>
</style>