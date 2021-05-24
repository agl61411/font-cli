<template>
  <el-card class="note-info">
    <el-collapse>
      <el-collapse-item>
        <template v-slot:title>
          <span>日常记录
            <!-- <span style="color: #606266" v-if="collapseData.daily.data.length > 0"> / 完成率：
              <span :style="completionRateColor">{{collapseData.daily.completionRate * 100}}%</span>
            </span> -->
          </span>
        </template>
        <daily-records :record="record" @setRecord="setRecord"/>
      </el-collapse-item>
      <el-collapse-item>

      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
import {
  computed,
  inject,
  reactive,
  watch,
  ref,
  getCurrentInstance
} from 'vue';
import DailyRecords from './DailyRecords.vue';
export default {
  components: { DailyRecords },
  setup () {
    const { ctx } = getCurrentInstance();
    const date = inject('date');

    const state = reactive({
      record: {}
    });

    const getRecord = async (recordTime) => {
      const url = ctx.$api.getDailyRecord(recordTime);
      const result = await ctx.$http.get(url);

      if (result.code === 0) {
        ctx.$notify.error({
          title: '错误',
          message: result.message
        });
        return;
      }

      state.record = result.data;
    };

    const recordTime = ref(new Date(date.value.toLocaleDateString()).getTime());
    getRecord(recordTime.value);

    const completionRateColor = computed(() => {
      let color = '';
      // const completionRate = state.collapseData.daily.completionRate;
      // if (completionRate < 0.6) {
      //   color = 'color: #F56C6C';
      // } else if (completionRate >= 1) {
      //   color = 'color: #67C23A';
      // }
      return color;
    });

    const setRecord = (record) => {
      state.record = record;
    };

    watch(date, (newV, oVal) => {
    });

    return {
      ...state,
      setRecord,
      completionRateColor
    };
  }
};
</script>

<style scoped>
</style>