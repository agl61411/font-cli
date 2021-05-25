<!--
* @Description: 每日记录表单
* @Date 2021/05/23 09:40
* @Author L.G.Y
-->
<template>
  <div>
    <el-form :model="form" :inline="true" label-width="80px">
      <el-form-item label="内容" :rules="[{ required: true, message: '请输入', tigger: 'change' }]">
        <el-input v-model="form.content" style="width: 217px"></el-input>
      </el-form-item>
      <el-form-item label="详情" :rules="[{ required: true, message: '请输入', tigger: 'change' }]">
        <el-input v-model="form.detail" style="width: 217px"></el-input>
      </el-form-item>
      <el-form-item label="类型" :rules="[{ required: true, message: '请输入', tigger: 'change' }]">
        <el-select v-model="form.type" placeholder="请选择类型" style="width: 217px">
          <el-option v-for="item in enums['ToDoType']" :label="item.name" :value="item.code" :key="item.code" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="end" align="middle">
      <el-button @click="onCancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="onCreateToDo">创建</el-button>
    </el-row>
  </div>
</template>

<script>
import { reactive, inject } from 'vue';
export default {
  setup (props, { emit }) {
    const loading = inject('loading');

    const form = reactive({
      content: '',
      detail: '',
      type: '',
      recordId: null
    });

    const onCancel = () => {
      emit('onCancel');
    };
    
    const onCreateToDo = () => {
      emit('onCreateToDo', form);
    };

    return {
      form,
      loading,
      onCancel,
      onCreateToDo
    };
  }
};
</script>

<style scoped>

</style>