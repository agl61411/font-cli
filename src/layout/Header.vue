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
        <template v-for="menu in navs" :key="menu.url">
          <el-submenu v-if="menu.children && menu.children.length > 0" :index="menu.url">
            <template v-slot:title>{{menu.name}}</template>
            <el-menu-item v-for="child in menu.children" :key="child.url" :index="child.url">{{child.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="menu.url">{{menu.name}}</el-menu-item>
        </template>        
      </el-menu>
    </div>
    <el-button type="text" @click="openDrawer">
      <i class="el-icon-s-operation navi-simple" />
    </el-button>
    <el-drawer
      v-model="drawer"
      direction="ltr"
      custom-class="drawer-style"
      :with-header="false">
      <el-menu
        :default-active="defaultIndex"
        :router="true"
        class="el-menu-vertical-demo"
        mode="vertical"
        background-color="#545c64"
        text-color="#fff"
        style="border: none;"
        @select="closeDrawer"
        active-text-color="#ffd04b">
        <template v-for="menu in navs" :key="menu.url">
          <el-submenu v-if="menu.children && menu.children.length > 0" :index="menu.url">
            <template v-slot:title>{{menu.name}}</template>
            <el-menu-item v-for="child in menu.children" :key="child.url" :index="child.url">{{child.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="menu.url">{{menu.name}}</el-menu-item>
        </template>  
      </el-menu>
    </el-drawer>
    <personal-info />
  </div>
</template>

<script>
import { navs } from './_nav.js';
import { useRoute } from 'vue-router';
import PersonalInfo from './PersonalInfo.vue';
import { ref, watch } from 'vue';

export default {
  components: {
    PersonalInfo
  },
  setup () {
    const route = useRoute();

    const defaultIndex = ref(route.path);
    const drawer = ref(false);

    const openDrawer = () => {
      drawer.value = true;
    };

    watch(() => route.path, (nval, oval) => {
      if (oval !== route.path) {
        defaultIndex.value = route.path;
      }
    });

    const closeDrawer = () => {
      drawer.value = false;
    };

    return {
      navs,
      defaultIndex,
      drawer,
      openDrawer,
      closeDrawer
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

  .header:deep(.el-drawer) {
    background-color: #545c64;
    min-width: 160px;
    max-width: 160px;
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