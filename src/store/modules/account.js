const stateTemp = {
  info: {}
};

const state = JSON.parse(JSON.stringify(stateTemp));

const actions = {};

const mutations = {
  info: (state, info) => state.info = info
};

const getters = {
  info: state => state.info
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};