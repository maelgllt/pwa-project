<template>
  <div class="phone-call">
    <label for="phone-number" class="phone-label">
      Numéro de téléphone :
      <input
      id="phone-number"
        v-model="phoneNumber"
        type="tel"
        placeholder="Entrez un numéro de téléphone"
        class="phone-input"
      />
    </label>
    <button @click="makeCall" :disabled="!isValidPhoneNumber" class="call-button">
      Appeler
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'PhoneCallComponent',
  setup() {
    const phoneNumber = ref<string>('');

    // Validation simple pour vérifier que le numéro est au bon format
    const isValidPhoneNumber = computed(() => {
      const phoneRegex = /^\+?[0-9\s\-()]+$/;
      return phoneRegex.test(phoneNumber.value);
    });

    const makeCall = () => {
      if (isValidPhoneNumber.value) {
        window.location.href = `tel:${phoneNumber.value}`;
      } else {
        alert('Numéro de téléphone invalide !');
      }
    };

    return {
      phoneNumber,
      isValidPhoneNumber,
      makeCall,
    };
  },
});
</script>

<style scoped>
.phone-call {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.phone-input {
  padding: 8px;
  font-size: 16px;
  width: 250px;
}

.call-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.call-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
