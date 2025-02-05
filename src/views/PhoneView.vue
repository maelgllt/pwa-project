<template>
  <div class="home">
    <MyPhone />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyPhone from '@/components/MyPhone.vue';

export default defineComponent({
  name: 'PhoneView',
  components: {
    MyPhone,
  },
});
</script>
