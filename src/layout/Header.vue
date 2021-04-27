<template>
  <div class="header">
    <div class="navi-full">
      <img class="logo" src="@/assets/logo.png" />
      <h6 style="margin: 0px 20px 0px 10px;">logo</h6>
      <custom-menu :defaultIndex="defaultIndex" mode="horizontal" @closeDrawer="closeDrawer"/>
    </div>
    <el-button type="text" @click="openDrawer">
      <i class="el-icon-s-operation navi-simple" />
    </el-button>
    <el-drawer
      v-model="drawer"
      direction="ltr"
      custom-class="drawer-style"
      :with-header="false">
      <custom-menu :defaultIndex="defaultIndex" mode="vertical" @closeDrawer="closeDrawer"/>
    </el-drawer>
    <personal-info />
  </div>
</template>

<script>
import { navs } from './_nav.js';
import { useRoute } from 'vue-router';
import PersonalInfo from './PersonalInfo.vue';
import CustomMenu from './CustomMenu';
import { ref, watch } from 'vue';

export default {
  components: {
    PersonalInfo,
    CustomMenu
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