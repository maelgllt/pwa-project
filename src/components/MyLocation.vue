<template>
  <div v-if="isOnline">
    <p>Latitude: {{ latitude }}</p>
    <p>Longitude: {{ longitude }}</p>
  </div>
  <div v-else>
    <p>Vous êtes hors ligne. Veuillez vous connecter à Internet pour voir votre localisation.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      latitude: null,
      longitude: null,
      isOnline: navigator.onLine,
    };
  },
  mounted() {
    this.getLocation();
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
  beforeMount() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
          },
          (error) => {
            alert('Error getting location:', error);
          },
        );
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    },
    updateOnlineStatus() {
      this.isOnline = navigator.onLine;
    },
  },
};
</script>

<style scoped>
</style>
