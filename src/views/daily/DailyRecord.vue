<template>
  <el-card>
    <el-collapse>
      <el-collapse-item name="TO_DO" title="日常记录">
        <to-do-item />
      </el-collapse-item>
      <el-collapse-item name="CONSUMPTION" title="消费记录">
        <consumption-item />
      </el-collapse-item>
    </el-collapse>
  </el-card>
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