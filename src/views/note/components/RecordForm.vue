<!--
* @Description: 每日记录表单
* @Date 2021/05/23 09:40
* @Author L.G.Y
-->
<template>
  <div>
    
  </div>
</template>

<script>
import { reactive } from 'vue';
export default {
  setup () {
    const state = reactive({
      content: '',
      detail: '',
      type: '',
      recordId: null
    });
  }
};
</script>

<style scoped>

</style>