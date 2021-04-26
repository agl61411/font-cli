<template>
  <div class="login-form">
    <el-tabs v-model="form.loginType">
      <el-tab-pane label="密码登录" name="PASSWORD">
        <el-form-item prop="username"
          :rules="[{required: form.loginType === 'PASSWORD', message: '必填', trigger: 'change'}]">
          <el-input v-model="form.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="password"
          :rules="[{required: form.loginType === 'PASSWORD', message: '必填', trigger: 'change'}]">
          <el-input v-model="form.password" placeholder="请输入" />
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="手机登录" name="CAPTCHA">
        <el-form-item prop="mobile"
          :rules="[{required: form.loginType === 'CAPTCHA', message: '必填', trigger: 'change'}]">
          <el-input v-model="form.mobile" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="captcha"
          :rules="[{required: form.loginType === 'CAPTCHA', message: '必填', trigger: 'change'}]">
          <el-input v-model="form.captcha" placeholder="请输入">
            <template v-slot:suffix>
              <el-button type="primary" :class="btnDisabled ? 'disabled-btn' : 'login-btn'" :loading="captchaLoading" @click="getCaptcha">
                <span v-show="!btnDisabled">获取验证码</span>
                <span v-show="btnDisabled">{{count}}秒后重试</span>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  ref,
  inject
} from 'vue';

export default {
  setup () {
    const form = inject('form');
    
    const captchaLoading = ref(false);
    const btnDisabled = ref(false);
    const count = ref(60);

    const getCaptcha = () => {
      if (btnDisabled.value) {
        return;
      }
      captchaLoading.value = true;
      setTimeout(() => {
        // TODO 获取验证码
        captchaLoading.value = false;
        btnDisabled.value = true;
        countDown();
      }, 2000);
    };

    const countDown = () => {
      if (count.value === 0) {
        btnDisabled.value = false;
        count.value = 60;
      } else {
        count.value--;
        setTimeout(() => {
          countDown();
        }, 1000);
      }
    };

    return {
      form,
      count,
      btnDisabled,
      captchaLoading,
      getCaptcha
    };
  }
};
</script>

<style scoped>
  .login-form:deep(.el-input__suffix) {
    right: 0px
  }

  .login-form:deep(.el-form-item) {
    margin-bottom: 16px;
  }

  .disabled-btn,
  .disabled-btn:hover,
  .disabled-btn:focus {
    color: #fff;
    background-color: #66b1ff;
    border-color: #317ac4;
  }
</style>