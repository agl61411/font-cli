<template>
  <el-card class="note-info">
    <el-collapse>
      <el-collapse-item>
        <template v-slot:title>
          <span>日常记录
            <span style="color: #606266" v-if="collapseData.daily.data.length > 0"> / 完成率：
              <span :style="completionRateColor">{{collapseData.daily.completionRate * 100}}%</span>
            </span>
          </span>
        </template>
        <daily-records />
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
  provide,
  reactive,
  watch
} from 'vue';
import DailyRecords from './DailyRecords.vue';
export default {
  components: { DailyRecords },
  setup () {
    const date = inject('date');

    const state = reactive({
      defaultTask: [{
        id: null,
        createdTime: '',
        modifiedTime: '',
        disused: false,
        content: '',
        longterm: false,
        longtermTimes: [],
        type: ''
      }],
      collapseData: {
        daily: {
          id: 122,
          createdTime: '',
          modifiedTime: '',
          disused: false,
          dailyTime: '',
          completionRate: 1,
          ended: true,
          data: [
            {
              id: null,
              createdTime: '',
              modifiedTime: '',
              disused: false,
              content: 'afasfasfasfasfasfasf',
              detail: 'asfsafsadfsdafkjsadhfkjsaldflkasdhfkjladshkjflhsadjklfhkasjl',
              longterm: false,
              defaultTaskId: '',
              type: '',
              completed: false,
              completedTime: ''
            },
            {
              id: null,
              createdTime: '',
              modifiedTime: '',
              disused: false,
              content: 'afasfasfasfasfasfasf',
              detail: null,
              longterm: false,
              defaultTaskId: '',
              type: '',
              completed: true,
              completedTime: ''
            }
          ]
        },
        consume: {

          data: []
        }
      }
    });

    provide('collapseData', state.collapseData);

    const completionRateColor = computed(() => {
      let color = '';
      const completionRate = state.collapseData.daily.completionRate;
      if (completionRate < 0.6) {
        color = 'color: #F56C6C';
      } else if (completionRate >= 1) {
        color = 'color: #67C23A';
      }
      return color;
    });

    watch(date, (newV, oVal) => {
      console.log('------------------------------------------');
      console.log(new Date(newV.toLocaleDateString()).getTime());
      console.log(oVal);
    });

    return {
      ...state,
      completionRateColor
    };
  }
};
</script>

<style scoped>
</style>