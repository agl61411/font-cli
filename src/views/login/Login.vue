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
  provide,
  getCurrentInstance
} from 'vue';

import {
  useRouter, useRoute
} from 'vue-router';

import { useStore } from 'vuex';

import LoginForm from './components/LoginForm.vue';
import LoginBtnGroup from './components/LoginBtnGroup';

export default {
  components: { LoginForm, LoginBtnGroup },
  setup () {
    const elForm = ref();

    const router = useRouter();
    const route = useRoute();
    
    const store = useStore();

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

    const { ctx } = getCurrentInstance();

    const onLogin = () => {
      elForm.value.validate(valid => {
        if (valid) {
          _onLogin();
        }
      });
    };

    const _onLogin = async () => {
      state.loading = true;

      const url = ctx.$api.login();
      const result = await ctx.$http.post(url, state.form, {}, false);

      state.loading = false;

      if (result.code === 0) {
        ctx.$notify.error({
          title: '错误',
          message: result.message
        });
        return;
      }

      // 将用户信息存储在sessionStorage
      sessionStorage.setItem('account_info', JSON.stringify(result.data));
      store.commit('account/info', result.data);
      
      if (route.query && route.query.backUrl) {
        router.push(route.query.backUrl);
      } else {
        router.push('/');
      }
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