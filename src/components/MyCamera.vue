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

      this.sendNotification('Une photo a été prise');
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
    async sendNotification(body) {
      const registration = await navigator.serviceWorker.getRegistration();

      const title = 'Photo prise !';

      const payload = {
        body,
      };

      if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          if (this.registration && 'showNotification' in this.registration) {
            this.registration.showNotification(title, payload);
          } else {
            const notification = new Notification(title, payload);
          }

          if ('vibrate' in navigator) {
            navigator.vibrate(200);
          }
        }
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
