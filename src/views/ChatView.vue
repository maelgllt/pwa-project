<template>
  <div class="home">
    <MyChat />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyChat from '@/components/MyChat.vue';

export default defineComponent({
  name: 'ChatView',
  components: {
    MyChat,
  },
});
</script>
