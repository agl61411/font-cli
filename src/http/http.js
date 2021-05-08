import axios from 'axios';

function getHeaders (auth) {
  const info = getAccount();

  let headers = {};

  if (auth) {
    headers['Authorization'] = 'Bearer ' + info.token;
  }
  if (info.accountId) {
    headers['account_id'] = info.accountId;
  }
  return headers;
}

function getAccount () {
  const accountStr = sessionStorage.getItem('account_info');
  if (accountStr) {
    return JSON.parse(accountStr);
  } else {
    return {};
  }
}

export default {
  get (url, params, auth = true) {
    let headers = getHeaders(auth);
    return axios.get(url, {
      headers: headers,
      params: params
    });
  },
  post (url, data, params, auth = true) {
    let headers = getHeaders(auth);
    return axios.post(url, data, {
      headers: headers,
      params: params
    });
  },
  put (url, data, params, auth = true) {
    let headers = getHeaders(auth);
    return axios.delete(url, data, {
      headers: headers,
      params: params
    });
  },
  delete (url, params, auth = true) {
    let headers = getHeaders(auth);
    return axios.delete(url, {
      headers: headers,
      params: params
    });
  }
};