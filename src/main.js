import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Element
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

// css
import './css/_custom.css';

// http
import api from '@/http/api';
import http from '@/http/http';

// axios 拦截器
import '@/http/axios';

import { Enums } from '@/common/enum';

const app = createApp(App);

app.config.globalProperties.$http = http;
app.config.globalProperties.$api = api;
app.config.globalProperties.$enums = Enums;

app.use(store).use(router).use(ElementPlus).mount('#app');

app.mixin({
  data () {
    return {
      ENUMS: Enums
    };
  },
  methods: {
    getEnumName (enumName, code) {
      const result = Enums[enumName].find(e => e.code === code);
      return result ? result['name'] : '';
    }
  }
});