<!--
* @Description: Note模块
* @Date 2021/04/09 15:39
* @Author L.G.Y
-->
<template>
  <el-row type="flex" justify="space-around" align="top" class="note-page">
    <el-col :xs="24" :md="11">
      <note-calendar />
    </el-col>
    <el-col :xs="24" :md="11" style="margin-top: 10px">
      <note-info />
    </el-col>
  </el-row>
</template>

<script>
import { provide, ref } from 'vue';
import NoteCalendar from './components/NoteCalendar';
import NoteInfo from './components/NoteInfo';

export default {
  components: { NoteCalendar, NoteInfo },
  setup () {
    const date = ref(new Date());
    const loading = ref(false);
    provide('date', date);
    provide('loading', loading);

    return {
      date
    };
  }
};
</script>

<style scoped>
  .note-page {
    padding: 10px
  }
</style>