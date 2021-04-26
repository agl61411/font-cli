<template>
  <el-card class="note-calendar">
    <el-calendar v-model="date"></el-calendar>
  </el-card>
</template>

<script>
import { inject } from 'vue';
export default {
  setup () {
    const date = inject('date');

    return {
      date
    };
  }
};
</script>

<style scoped>
  .note-calendar:deep(.el-calendar-table .el-calendar-day)  {
    height: 65px;
  }
</style>