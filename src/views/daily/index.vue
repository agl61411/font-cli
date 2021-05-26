<template>
  <el-row type="flex" justify="space-around" align="top" class="note-page">
    <el-col :xs="24" :md="11" style="margin-bottom: 10px">
      <el-card>
        <el-calendar v-model="state.calendar">
          <template v-slot:dateCell="props">
            <p :class="props.data.isSelected ? 'is-selected' : ''">
              {{ props.data.day.split('-').slice(1).join('-') }} {{ props.data.isSelected ? '✔️' : ''}}
            </p>
          </template>
        </el-calendar>
      </el-card>
    </el-col>
    <el-col :xs="24" :md="11">
      <daily-record />
    </el-col>
  </el-row>
</template>

<script>
import {
  reactive,
  watch
} from 'vue';

import { useStore } from 'vuex';

import DailyRecord from './DailyRecord';

export default {
  components: { DailyRecord },
  setup () {
    const store = useStore();

    if (!store.getters['dailyRecord/record']) {
      store.dispatch('dailyRecord/getRecord');
    }

    const state = reactive(store.getters['dailyRecord/state']);

    watch(() => state.calendar, (nval, oval) => {
      store.dispatch('dailyRecord/getRecord');
    });

    return {
      state
    };
  }
};
</script>

<style scoped>
  .note-page {
    padding: 10px;
  }

  .is-selected {
    color: #1989FA;
  }
</style>