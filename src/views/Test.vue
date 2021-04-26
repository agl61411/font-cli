<template lang="">
  <div>
      
  </div>
</template>
<script>
import { toRef, toRefs } from 'vue';

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String
    }
  },
  setup (props, context) {
    const { title, message} = toRefs(props);
    console.log(title.value);
    console.log(message);

    const message1 = toRef(props, 'message');
    console.log(message1.value);

    console.log(context);
    return {};
  }
};
</script>
<style lang="">
    
</style>