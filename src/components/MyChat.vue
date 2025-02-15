<template>
  <div class="chat-container">
    <div v-if="!isConnected" class="login-container">
      <input v-model="pseudo" placeholder="Pseudo..." class="input-field" />
      <input v-model="roomName" placeholder="Channel..." class="input-field" />
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
    const roomName = ref('general');
    const isConnected = ref(false);
    let socket = null;

    const joinRoom = () => {
      if (!socket) {
        console.error('Erreur : Socket non initialisé !');
        return;
      }
      socket.emit('chat-join-room', {
        pseudo: pseudo.value,
        roomName: roomName.value,
      });
    };

    const sendMessage = () => {
      if (newMessage.value) {
        socket.emit('chat-msg', {
          content: newMessage.value,
          roomName: roomName.value,
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

    const connectToChat = () => {
      console.log('Tentative de connexion...');
      if (!pseudo.value) {
        console.error('Pseudo manquant !');
        return;
      }

      if (!socket) {
        socket = io('https://mohammedelmehdi.makhlouk.angers.mds-project.fr', {
          transports: ['websocket'],
        });

        if (socket) {
          socket.on('connect', () => {
            console.log('Connecté au serveur Socket.IO !');
          });
          socket.on('chat-msg', receiveMessage);
        }
      }
      isConnected.value = true;
      joinRoom();
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };

    onMounted(() => {
      if (!socket) {
        console.warn('Socket non initialisé dans onMounted');
        return;
      }
      socket.on('chat-msg', receiveMessage);
    });

    return {
      messages,
      newMessage,
      pseudo,
      roomName,
      isConnected,
      connectToChat,
      sendMessage,
      formatDate,
    };
  },
};
</script>

<style scoped>
/* 🌍 Applique un style sur toute la page */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Arial, sans-serif;
}

/* 📌 Conteneur principal qui prend toute la page */
.chat-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 🎭 Formulaire de connexion centré */
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input-field {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 80%;
  max-width: 400px;
  margin-bottom: 10px;
}

.connect-button {
  padding: 12px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  width: 80%;
  max-width: 400px;
}

.connect-button:hover {
  background: #45a049;
}

/* 💬 Zone des messages */
.messages {
  flex: 1; /* Prend tout l'espace disponible */
  overflow-y: auto;
  padding: 15px;
  background: white;
  border-bottom: 1px solid #ddd;
}

/* 🎭 Un message */
.message {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  background: #e3e3e3;
}

.message-info {
  font-size: 12px;
  color: #666;
  display: flex;
  justify-content: space-between;
}

.author {
  font-weight: bold;
}

.content {
  margin-top: 5px;
}

/* ✍️ Champ de saisie et bouton d'envoi en bas de page */
.input-container {
  display: flex;
  padding: 10px;
  background: #fff;
  border-top: 1px solid #ddd;
}

.message-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.send-button {
  padding: 10px 15px;
  background: #008cba;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 10px;
}

.send-button:hover {
  background: #0073a6;
}

</style>
