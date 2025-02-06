<template>
  <div class="camera-container">
    <video ref="video" width="640" height="480" autoplay>
      <track default kind="captions" srclang="en" src="" />
    </video>
    <button @click="capturePhoto">Prendre une photo</button>
    <canvas ref="canvas" style="display:none;" class="mirrored"></canvas>
    <img :src="photo" alt="Captured Photo" v-if="photo" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      photo: null,
      registration: null,
      photos: [],
    };
  },
  async mounted() {
    this.startCamera();
    this.registration = await navigator.serviceWorker.getRegistration();
    this.loadPhotosFromLocalStorage();
    this.requestNotificationPermission();
  },
  methods: {
    startCamera() {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        })
        .catch((error) => {
          alert('Error accessing the camera:', error);
        });
    },
    async capturePhoto() {
      const { video } = this.$refs;
      const { canvas } = this.$refs;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      this.photo = canvas.toDataURL('image/png');
      this.savePhotoToLocalStorage(this.photo);

      this.showNotification();
    },
    savePhotoToLocalStorage(photo) {
      this.photos.push(photo);
      localStorage.setItem('photos', JSON.stringify(this.photos));
    },
    loadPhotosFromLocalStorage() {
      const storedPhotos = localStorage.getItem('photos');
      if (storedPhotos) {
        this.photos = JSON.parse(storedPhotos);
      }
    },
    async requestNotificationPermission() {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('notif autorisées');
        } else {
          console.warn('notif refusées');
        }
      }
    },

    async showNotification() {
      const title = 'Photo prise !';
      const options = {
        body: 'Votre photo a été prise avec succès.',
      };

      const registration = await navigator.serviceWorker.getRegistration();

      if ('Notification' in window && Notification.permission === 'granted') {
        if (registration && 'showNotification' in registration) {
          console.log('envoi de la notification via Service Worker..');
          registration.showNotification(title, options);
        } else {
          const notification = new Notification(title, options);
        }

        if ('vibrate' in navigator) {
          navigator.vibrate(200);
        }
      } else {
        console.warn('notif non actives.');
      }
    },
  },
};
</script>

<style scoped>
.camera-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

video {
  border: 1px solid black;
  margin-bottom: 10px;
}

button {
  margin-bottom: 10px;
}

img {
  margin-top: 10px;
  border: 1px solid black;
}
</style>
