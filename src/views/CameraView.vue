<template>
  <div class="home">
    <MyCamera />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyCamera from '@/components/MyCamera.vue';

export default defineComponent({
  name: 'CameraView',
  components: {
    MyCamera,
  },
});
</script>
