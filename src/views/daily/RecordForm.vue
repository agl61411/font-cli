<!--
* @Description: 每日记录表单
* @Date 2021/05/23 09:40
* @Author L.G.Y
-->
<template>
  <div>
    <el-form ref="refForm" :model="form" label-width="80px" label-position="right">
      <el-form-item label="内容" prop="content" 
                    :rules="[{ required: true, message: '请输入', tigger: 'change' }]">
        <el-input v-model.trim="form.content" style="width: 217px"></el-input>
      </el-form-item>
      <el-form-item label=" 详情">
        <el-input v-model.trim="form.detail" style="width: 217px"></el-input>
      </el-form-item>
      <el-form-item label=" 类型">
        <el-select v-model="form.type" style="width: 217px">
          <el-option v-for="item in ENUMS['ToDoType']" :label="item.name" :value="item.code" :key="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label=" 目标时长">
        <el-input v-model.number="form.targetDuration" style="width: 217px"></el-input>
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
      detail: '',
      type: '',
      targetDuration: null,
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

      const url = ctx.$api.createToDo();
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

<style scoped>

</style>