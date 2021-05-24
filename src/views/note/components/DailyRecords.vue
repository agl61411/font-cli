<!--
* @Description: 日常记录
* @Date 2021/04/09 15:39
* @Author L.G.Y
-->
<template>
  <el-row type="flex" justify="start">
    <template v-if="record">
      <!-- <div style="width: 100%" v-for="item in record.data" :key="item.id">
        <div class="record-row">
          <el-row type="flex" justify="start">
            <h6 class="records-text content-text">{{item.content}}</h6>
            <el-button class="detail-btn" v-if="item.detail" type="text" @click="item.showDetail = !item.showDetail">
              详情
            </el-button>
          </el-row>
          <el-checkbox v-model="item.checked" v-if="!item.completed && !daily.ended"></el-checkbox>
          <p v-if="item.completed">✔️</p>
        </div>
        <collapse-transition>
          <template v-slot:content>
            <h6 class="records-text detail-text" v-show="item.showDetail">{{item.detail}}</h6>
          </template>
        </collapse-transition>
      </div> -->
      <el-row type="flex" justify="end" align="middle" class="records-btn-row">
        <el-button type="primary" size="mini" @click="onAdd">添加</el-button>
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
  inject,
  getCurrentInstance,
  toRefs
} from 'vue';
import {
  CollapseTransition
} from '@/components';
export default {
  components: {
    // CollapseTransition
  },
  props: {
    record: {
      required: true
    }
  },
  setup (props, { emit }) {
    const { ctx } = getCurrentInstance();
    const date = inject('date');
    
    const onAdd = () => {
      console.log('--------------------onAdd-----------------------------');
    };
      
    const onComplete = () => {
      console.log('--------------------onComplete-----------------------------');
    };

    const onCreate = async () => {
      const form = {
        recordTime: new Date(date.value.toLocaleDateString()).getTime()
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

      emit('setRecord', result.data);
    };

    return {
      ...toRefs(props),
      onAdd,
      onComplete,
      onCreate
    };
  }
};
</script>

<style scoped>
  .record-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  .detail-text {
    font-size: 14px;
    color: #909399;
    text-align: left;
  }

  .detail-btn {
    padding: 0px;
    min-height: 0px;
  }

  .create-btn {
    width: 200px;
    height: 123.6px;
  }

  .records-btn-row {
    width: 100%;
    margin-top: 20px
  }
</style>