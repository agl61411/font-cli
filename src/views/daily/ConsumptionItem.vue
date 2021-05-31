<template>
  <el-row class="consumption-item">
    <el-table :data="state.record.consumptionList">
      <el-table-column label="内容" prop="content"></el-table-column>
      <el-table-column label="类型">
        <template #default="scope">
          <span>{{ENUMS['ConsumptionType'][scope.row.type]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" prop="money"></el-table-column>
    </el-table>
    <el-row type="flex" justify="end" class="records-btn-row">
      <el-button size="mini" type="primary" @click="appendVisible = true">添加</el-button>
    </el-row>
  </el-row>
  <el-dialog v-model="appendVisible" title="创建消费项" width="400px" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
    <consumption-form v-if="appendVisible" @onCloseDialog="appendVisible = false" />
  </el-dialog>
</template>

<script>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import ConsumptionForm from './ConsumptionForm.vue';

export default {
  components: { ConsumptionForm },
  setup () {
    const store = useStore();
    const state = reactive(store.getters['dailyRecord/state']);
    
    const appendVisible = ref(false);

    return {
      appendVisible,
      state
    };
  }
};
</script>

<style scoped>
  .records-btn-row {
    width: 100%;
    margin-top: 20px;
  }
</style>