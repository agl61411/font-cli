import axios from 'axios';

function getHeaders (auth) {
  const token = sessionStorage.getItem('token');

  let headers = {};

  if (auth) {
    headers['Authorization'] = 'Bearer ' + token;
  }
  const accountId = getAccountId();
  if (accountId) {
    headers['account_id'] = accountId;
  }
  console.log(headers);
  return headers;
}

function getAccountId () {
  const accountStr = sessionStorage.getItem('account');
  if (accountStr) {
    return JSON.parse(accountStr)['accountId'];
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