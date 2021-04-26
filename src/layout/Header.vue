<template>
  <div class="header">
    <div class="navi-full">
      <img class="logo" src="@/assets/logo.png" />
      <h6 style="margin: 0px 20px 0px 10px;">logo</h6>
      <el-menu
        :default-active="defaultIndex"
        :router="true"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item v-for="menu in navs" :key="menu.url" :index="menu.url">
          {{menu.name}}
        </el-menu-item>
      </el-menu>
    </div>
    <i class="el-icon-s-operation navi-simple" />
    <personal-info />
  </div>
</template>

<script>
import { navs } from './_nav.js';
import { useRoute } from 'vue-router';
import PersonalInfo from './PersonalInfo.vue';
import { ref } from 'vue';

export default {
  components: {
    PersonalInfo
  },
  setup () {
    const route = useRoute();

    const defaultIndex = ref(route.path);

    return {
      navs,
      defaultIndex
    };
  }
};
</script>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 10px;
  }

  .navi-full {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .logo {
    width: 50px;
    height: 50px;
  }

  .navi-simple {
    width: 0px;
    overflow: hidden;
    font-size: 40px;
  }

  @media screen and (max-width: 768px) {
    .navi-full {
      display: none;
    }
    
    .navi-simple {
      width: 40px;
    }
  }
</style>