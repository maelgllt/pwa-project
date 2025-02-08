<template>
  <div class="chat-container">
    <div v-if="!isConnected" class="login-container">
      <input v-model="pseudo" placeholder="Pseudo..." class="input-field" />
      <input v-model="roomId" placeholder="Channel..." class="input-field" />
      <button @click="connectToChat" class="connect-button">Connect</button>
    </div>

    <div v-else>
      <div class="messages" ref="messagesContainer">
        <div v-for="msg in messages" :key="msg.dateEmis" class="message">
          <div class="message-info">
            <span class="author">{{ msg.pseudo }}</span>
            <span class="date">{{ formatDate(msg.dateEmis) }}</span>
          </div>
          <div class="content">{{ msg.content }}</div>
        </div>
      </div>

      <div class="input-container">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Type a message..."
          class="message-input"
        />

        <button @click="sendMessage" class="send-button">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import io from 'socket.io-client';

export default {
  setup() {
    const messages = ref([]);
    const newMessage = ref('');
    const pseudo = ref('');
    const roomId = ref('general');
    const socket = io('http://mohammedelmehdi.makhlouk.angers.mds-project.fr:40220');

    const joinRoom = () => {
      socket.emit('chat-join-room', {
        pseudo: pseudo.value,
        roomId: roomId.value,
      });
    };

    const sendMessage = () => {
      if (newMessage.value) {
        socket.emit('chat-msg', {
          msg: newMessage.value,
          roomId: roomId.value,
        });
        newMessage.value = '';
      }
    };

    const receiveMessage = (message) => {
      messages.value.push({
        content: message.content,
        dateEmis: message.dateEmis,
        serverId: message.serverId,
        pseudo: message.pseudo,
      });
    };

    onMounted(() => {
      socket.on('chat-msg', receiveMessage);
      joinRoom();
    });

    return {
      messages,
      newMessage,
      pseudo,
      roomId,
      sendMessage,
    };
  },
};
</script>

<style scoped>

</style>
