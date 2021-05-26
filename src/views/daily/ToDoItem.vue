<template>
  <el-row type="flex" justify="start" class="todo-item">
    <template v-if="state.record">
      <div style="width: 100%" v-for="item in state.record.toDoList" :key="item.id">
        <el-row type="flex" justify="space-between" align="middle">
          <el-row type="flex" justify="start">
            <h6 class="records-text content-text">{{item.content}}</h6>
            <el-button class="detail-btn" v-if="item.detail" type="text" @click="item.showDetail = !item.showDetail">
              详情
            </el-button>
          </el-row>
          <p v-if="item.completed">✔️</p>
        </el-row>
        <collapse-transition>
          <template v-slot:content>
            <h6 class="records-text detail-text" v-show="item.showDetail">{{item.detail}}</h6>
          </template>
        </collapse-transition>
        <el-divider direction="horizontal"></el-divider>
      </div>
      <el-row type="flex" justify="end" align="middle" class="records-btn-row">
        <el-button type="primary" size="mini" @click="appendVisible = true">添加</el-button>
      </el-row>
    </template>
    <template v-else>
      <el-row style="width: 100%" type="flex" justify="center" align="middle">
        <el-button class="create-btn" @click="onCreate">创建今日</el-button>
      </el-row>
    </template>
  </el-row>
</template>

<script>
import {
  reactive,
  getCurrentInstance
} from 'vue';

import { useStore } from 'vuex';

import { CollapseTransition } from '@/components';

export default {
  components: {
    CollapseTransition
  },
  setup () {
    const { ctx } = getCurrentInstance();

    const store = useStore();
    const state = reactive(store.getters['dailyRecord/state']);

    const onCreate = async () => {
      const form = {
        recordTime: new Date(state.calendar.toLocaleDateString()).getTime()
      };

      const url = ctx.$api.createDailyRecord();
      const result = await ctx.$http.post(url, form);

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
      state,
      onCreate
    };
  }
};
</script>

<style scoped>
  .create-btn {
    width: 200px;
    height: 123.6px;
  }

  .records-text {
    margin: 0px;
    font-weight: normal;
  }

  .content-text {
    padding-right: 10px;
    font-size: 16px;
    color: #606266;
  }

  .detail-btn {
    padding: 0px;
    min-height: 0px;
  }

  .detail-text {
    font-size: 14px;
    color: #909399;
    text-align: left;
  }

  .records-btn-row {
    width: 100%;
    margin-top: 20px
  }

  .todo-item:deep(.el-divider--horizontal ){
    margin: 5px 0;
  }
</style>