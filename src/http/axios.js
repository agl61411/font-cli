import axios from 'axios';

axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response.data;
}, error => {
  if (error && error.response) {
    return {
      code: 0,
      message: '系统错误，请稍后再试...'
    };
  }
});
