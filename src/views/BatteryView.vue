<template>
  <div class="home">
    <BatteryLevel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BatteryLevel from '@/components/BatteryLevel.vue';

export default defineComponent({
  name: 'BatteryView',
  components: {
    BatteryLevel,
  },
});
</script>
