<!--
* @Description: 日常记录
* @Date 2021/04/09 15:39
* @Author L.G.Y
-->
<template>
  <el-row type="flex" justify="start">
    <template v-if="daily">
      <div style="width: 100%" v-for="item in daily.data" :key="item.id">
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
      </div>
      <el-row type="flex" justify="end" align="middle" class="records-btn-row" v-if="!daily.ended">
        <el-button size="mini" @click="onAdd">添加</el-button>
        <el-button type="primary" size="mini" @click="onComplete">9527</el-button>
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
  inject
} from 'vue';
import {
  CollapseTransition
} from '@/components';
export default {
  components: {
    CollapseTransition
  },
  setup () {
    const {
      daily
    } = inject('collapseData');

    const onAdd = () => {
      console.log('--------------------onAdd-----------------------------');
    };
      
    const onComplete = () => {
      console.log('--------------------onComplete-----------------------------');
    };

    const onCreate = () => {
      console.log('--------------------onCreate-----------------------------');
    };

    return {
      daily,
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