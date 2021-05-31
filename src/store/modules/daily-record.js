import http from '@/http/http';
import api from '@/http/api';

import { ElNotification } from 'element-plus';

const stateTemp = {
  calendar: null,
  record: null,
  loading: false
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
      ElNotification.error({
        title: '错误',
        message: result.message
      });
      return;
    }

    if (result.data) {
      let deprecateList = [];
      let completeList = [];
      let otherList = [];
  
      result.data.toDoList.forEach(item => {
        if (item.completed) {
          completeList.push(item);
        } else if (item.deprecated) {
          deprecateList.push(item);
        } else {
          otherList.push(item);
        }
      });
  
      const toDoList = otherList.concat(completeList).concat(deprecateList);
      result.data.toDoList = toDoList;
    }

    commit('record', result.data);
  }
};

const mutations = {
  calendar: (state, calendar) => state.calendar = calendar,
  record: (state, record) => state.record = record,
  loading: (state, loading) => state.loading = loading
};

const getters = {
  state: state => state,
  calendar: state => state.calendar,
  record: state => state.record,
  loading: state => state.loading
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};