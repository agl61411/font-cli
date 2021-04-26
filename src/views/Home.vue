<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Test title="9527"></Test>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Test from '@/views/Test';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Test
  }
};
</script>
