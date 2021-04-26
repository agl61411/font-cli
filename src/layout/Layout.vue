<!--
* @Description: 项目布局
* @Date 2021/04/08 09:49
* @Author L.G.Y
-->
<template>
  <div class="layout">
    <div class="layout-header">
      <Header />
    </div>
    <div class="layout-body">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
export default {
  components: { Header }
};
</script>Header