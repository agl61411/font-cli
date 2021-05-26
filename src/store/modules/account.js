const stateTemp = {
  info: {}
};

const state = JSON.parse(JSON.stringify(stateTemp));

const actions = {
};

const mutations = {
  info: (state, info) => state.info = info
};

const getters = {
  info (state) {
    if (Object.keys(state.info).length !== 0) {
      return state.info;
    } else {
      const accountStr = sessionStorage.getItem('account_info');
      if (accountStr) {
        return JSON.parse(accountStr);
      }
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};