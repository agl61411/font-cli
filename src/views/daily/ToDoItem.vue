<template>
  <el-row type="flex" justify="start" class="todo-item">
    <template v-if="state.record">
      <el-row :loading="state.loading" style="width: 100%">
        <el-collapse style="width: 100%">
          <el-collapse-item v-for="item in state.record.toDoList" :key="item.id" :name="item.id">
            <template #title>
              <div class="collapse-title">
                <div>
                  <el-checkbox v-if="isEditing && !item.deprecated && !item.completed" v-model="item.checked" style="margin-right: 4px"></el-checkbox>
                  <span :style="item.deprecated ? 'text-decoration: line-through;color: #909399' : ''">{{item.content }}</span>
                </div>
                <div style="margin-right: 20px">{{item.completed ? '✔️' : ''}}</div>
              </div>
            </template>
            <div style="display: flex" :style="isEditing ? 'margin-left:18px' : ''">{{item.detail}}</div>
          </el-collapse-item>
        </el-collapse>
        <el-row v-if="isEditing" type="flex" justify="space-between" align="middle" class="records-btn-row">
          <el-button size="mini" @click="selectAll">全选 / 全不选</el-button>
          <div>
            <el-button size="mini" @click="isEditing = false">取消</el-button>
            <el-button size="mini" type="danger" @click="remind('DEPRECATE')">放弃</el-button>
            <el-button size="mini" type="success" @click="remind('COMPLETE')">完成</el-button>
          </div>
        </el-row>
        <el-row v-else type="flex" justify="end" align="middle" class="records-btn-row">
          <el-button v-if="state.record.toDoList.length > 0" size="mini" @click="isEditing = true">编辑</el-button>
          <el-button type="primary" size="mini" @click="appendVisible = true">添加</el-button>
        </el-row>
      </el-row>
    </template>
    <template v-else>
      <el-row style="width: 100%" type="flex" justify="center" align="middle">
        <el-button class="create-btn" @click="onCreate" :loading="state.loading">创建今日</el-button>
      </el-row>
    </template>
  </el-row>
  <el-dialog v-model="appendVisible" title="创建TODO项" width="400px" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
    <record-form v-if="appendVisible" @onCloseDialog="appendVisible = false"/>
  </el-dialog>
</template>

<script>
import {
  reactive,
  getCurrentInstance,
  ref
} from 'vue';

import { useStore } from 'vuex';

import RecordForm from './RecordForm';

export default {
  components: {
    RecordForm
  },
  setup () {
    const { ctx } = getCurrentInstance();
  
    const store = useStore();
    const state = reactive(store.getters['dailyRecord/state']);
    const appendVisible = ref(false);
    const isEditing = ref(false);

    const selectAll = () => {
      if (state.record.toDoList.every(item => item.checked)) {
        state.record.toDoList.forEach(item => item.checked = false);
      } else {
        state.record.toDoList.forEach(item => item.checked = true);
      }
    };

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

    const remind = (operation) => {
      const checkedList = state.record.toDoList.filter(item => item.checked);
      if (checkedList.length <= 0) {
        ctx.$message.error('请选择需要执行操作的数据！');
        return;
      }

      const operator = {
        DEPRECATE: '弃用',
        COMPLETE: '完成'
      };
      
      ctx.$confirm('是否要执行' + operator[operation] + '操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        switch (operation) {
        case 'DEPRECATE':
          onDeprecate(checkedList.map(item => item.id));
          break;
        case 'COMPLETE':
          onComplete(checkedList.map(item => item.id));
          break;
        default:
          break;
        }
      });
    };

    const onDeprecate = async (ids) => {

      const url = ctx.$api.deprecateToDos();
      const result = await ctx.$http.put(url, {
        ids: ids
      });

      if (result.code === 0) {
        ctx.$notify.error({
          title: '错误',
          message: result.message
        });
        return;
      }

      store.dispatch('dailyRecord/getRecord');
      isEditing.value = false;
    };

    const onComplete = async (ids) => {

      const url = ctx.$api.completeToDos();
      const result = await ctx.$http.put(url, {
        ids: ids
      });

      if (result.code === 0) {
        ctx.$notify.error({
          title: '错误',
          message: result.message
        });
        return;
      }

      store.dispatch('dailyRecord/getRecord');
      isEditing.value = false;
    };

    return {
      state,
      appendVisible,
      isEditing,
      selectAll,
      remind,
      onCreate
    };
  }
};
</script>

<style scoped>
  .todo-container {
    display: flex;
  }

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
    margin-left: 16px;
    font-size: 14px;
    color: #909399;
    text-align: left;
  }

  .records-btn-row {
    width: 100%;
    margin-top: 20px
  }

  .todo-item:deep(.el-divider--horizontal){
    background-color: #F2F6FC;
    margin: 5px 0;
  }
  .todo-item:deep(.el-collapse-item__header){
    align-items: baseline;
  }

  .collapse-title {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
</style>