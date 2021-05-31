<template>
  <div>
    <el-tabs type="border-card" v-if="state.record">
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-date"></i> 日常记录</span>
        </template>
        <to-do-item />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-wallet"></i> 消费记录</span>
        </template>
        <consumption-item />
      </el-tab-pane>
    </el-tabs>
    <el-card v-else>
      <div class="create-container">
        <el-button class="create-btn" @click="onCreate" :loading="loading">创建今日</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import {
  reactive, ref, getCurrentInstance
} from 'vue';

import ToDoItem from './ToDoItem';
import ConsumptionItem from './ConsumptionItem';

export default {
  components: { ToDoItem, ConsumptionItem},
  setup () {
    const loading = ref(false);

    const { ctx } = getCurrentInstance();

    const store = useStore();
    const state = reactive(store.getters['dailyRecord/state']);

    const onCreate = async () => {
      loading.value = true;

      const form = {
        recordTime: new Date(state.calendar.toLocaleDateString()).getTime()
      };

      const url = ctx.$api.createDailyRecord();
      const result = await ctx.$http.post(url, form);

      loading.value = false;

      if (result.code === 0) {
        ctx.$notify.error({
          title: '错误',
          message: result.message
        });
        return;
      }

      store.commit('dailyRecord/record', result.data);
    };

    return {
      loading,
      state,
      onCreate
    };
  }
};
</script>

<style scoped>
  .create-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
  }

  .create-btn {
    width: 200px;
    height: 123.6px;
  }
</style>