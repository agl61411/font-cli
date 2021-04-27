<!--
* @Description: 导航菜单
* @Date 2021/04/27 18:08
* @Author L.G.Y
-->
<template>
  <el-menu
    :default-active="defaultIndex"
    :router="true"
    :mode="mode"
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
</template>

<script>
import { toRefs } from 'vue';
import { navs } from './_nav.js';

export default {
  props: {
    defaultIndex: {
      required: true,
      type: String
    },
    mode: {
      required: true,
      type: String
    }
  },
  setup (props, { emit }) {

    const closeDrawer = () => {
      emit('closeDrawer');
    };
    
    return {
      navs,
      ...toRefs(props),
      closeDrawer
    };
  }
};
</script>

<style>

</style>