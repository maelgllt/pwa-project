<template>
  <div class="home">
    <MyLocation />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyLocation from '@/components/MyLocation.vue';

export default defineComponent({
  name: 'LocationView',
  components: {
    MyLocation,
  },
});
</script>
