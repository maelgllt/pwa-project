<template>
  <div class="home">
    <WebOTP />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WebOTP from '@/components/WebOTP.vue';

export default defineComponent({
  name: 'WebOTPView',
  components: {
    WebOTP,
  },
});
</script>
