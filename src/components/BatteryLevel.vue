<template>
  <div>
    <p>Niveau de batterie : {{ batteryLevel }}%</p>
    <p>Statut de la charge : {{ chargingStatus }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      batteryLevel: 0,
      chargingStatus: '',
    };
  },
  mounted() {
    this.checkBatteryLevel();
  },
  methods: {
    async checkBatteryLevel() {
      if ('getBattery' in navigator) {
        const battery = await navigator.getBattery();
        this.updateBatteryStatus(battery);

        battery.addEventListener('levelchange', () => {
          this.updateBatteryStatus(battery);
        });
      } else {
        console.log('Battery API non supportée');
      }
    },
    updateBatteryStatus(battery) {
      const batteryLevel = battery.level * 100;
      const chargingStatus = battery.charging ? 'En charge' : 'Non chargé';
      this.batteryLevel = batteryLevel;
      this.chargingStatus = chargingStatus;
    },
  },
};
</script>
