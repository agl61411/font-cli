import http from '@/http/http';
import api from '@/http/api';

import { Notification } from 'element-plus';

const stateTemp = {
  calendar: null,
  record: null
};

const state = JSON.parse(JSON.stringify(stateTemp));

const actions = {
  async getRecord ({dispatch, commit, state}) {
    if (!state.calendar) {
      commit('calendar', new Date());
    }

    const recordTime = new Date(state.calendar.toLocaleDateString()).getTime();

    const url = api.getDailyRecord(recordTime);
    const result = await http.get(url);

    if (result.code === 0) {
      Notification.error({
        title: '错误',
        message: result.message
      });
      return;
    }

    commit('record', result.data);
  }
};

const mutations = {
  calendar: (state, calendar) => state.calendar = calendar,
  record: (state, record) => state.record = record
};

const getters = {
  state: state => state,
  calendar: state => state.calendar,
  record: state => state.record
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};