<template>
  <el-tabs type="border-card">
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
</template>

<script>
import ToDoItem from './ToDoItem';
import ConsumptionItem from './ConsumptionItem';

export default {
  components: { ToDoItem, ConsumptionItem},
  setup () {
  }
};
</script>

<style scoped>

</style>