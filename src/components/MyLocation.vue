<template>
  <div v-if="isOnline">
    <p v-if="latitude">Latitude: {{ latitude }}</p>
    <p v-if="longitude">Longitude: {{ longitude }}</p>
    <div id="map"></div>
  </div>
  <div v-else>
    <p>Vous êtes hors ligne. Veuillez vous connecter à Internet pour voir votre localisation.</p>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  data() {
    return {
      latitude: null,
      longitude: null,
      isOnline: navigator.onLine,
      map: null,
      marker: null,
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
            this.initMap();
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
    initMap() {
      if (this.map) {
        this.map.setView([this.latitude, this.longitude], 13);
        if (this.marker) {
          this.marker.setLatLng([this.latitude, this.longitude]);
        } else {
          this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map)
            .bindPopup('Votre position actuelle').openPopup();
        }
        return;
      }

      this.map = L.map('map').setView([this.latitude, this.longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);

      this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map)
        .bindPopup('Votre position actuelle').openPopup();
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 400px;
}
</style>
