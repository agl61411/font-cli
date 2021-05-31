<!--
* @Description: 消费表单
* @Date 2021/05/28 16:11
* @Author L.G.Y
-->
<template>
  <div>
    <el-form ref="refForm" :model="form" label-width="80px" label-position="right">
      <el-form-item label="内容" prop="content" 
                    :rules="[{ required: true, message: '请输入', tigger: 'change' }]">
        <el-input v-model.trim="form.content" style="width: 217px"></el-input>
      </el-form-item>
      <el-form-item label=" 类型" prop="type"
                    :rules="[{ required: true, message: '请选择', tigger: 'change' }]">
        <el-select v-model="form.type" style="width: 217px">
          <el-option v-for="(value, key) in ENUMS['ConsumptionType']" :label="value" :value="key" :key="key" />
        </el-select>
      </el-form-item>
      <el-form-item label=" 金额" prop="money"
                    :rules="[{ required: true, type: 'number', message: '请输入', tigger: 'change' }]">
        <el-input v-model.number="form.money" style="width: 217px"></el-input>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="end" align="middle">
      <el-button @click="onCancel">取消</el-button>
      <el-button :loading="state.loading" type="primary" @click="onCreateToDo">创建</el-button>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';

export default {
  setup (props, { emit }) {
    const { ctx } = getCurrentInstance();
    const refForm = ref();

    const store = useStore();
    const state = reactive(store.getters['dailyRecord/state']);

    const form = reactive({
      content: '',
      type: '',
      money: null,
      recordId: null
    });

    const onCancel = () => {
      emit('onCloseDialog');
    };
    
    const onCreateToDo = () => {
      refForm.value.validate(valid => {
        if (valid) {
          _onCreateToDo();
        }
      });
    };

    const _onCreateToDo = async () => {
      store.commit('dailyRecord/loading', true);

      form.recordId = state.record.id;

      const url = ctx.$api.createConsumption();
      const result = await ctx.$http.post(url, form);

      store.commit('dailyRecord/loading', false);

      if (result.code === 0) {
        ctx.$notify.error({
          title: '错误',
          message: result.message
        });
        return;
      }

      store.dispatch('dailyRecord/getRecord');
      emit('onCloseDialog');
    };

    return {
      form,
      state,
      refForm,
      onCancel,
      onCreateToDo
    };
  }
};
</script>

<style>

</style>