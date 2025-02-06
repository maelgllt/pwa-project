<template>
  <div class="otp-container">
    <label for="otp">Entrez le code OTP :
      <input type="text" id="otp" v-model="otp" placeholder="Code OTP" />
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      otp: '',
    };
  },
  mounted() {
    if ('OTPCredential' in window) {
      navigator.credentials
        .get({ otp: { transport: ['sms'] } })
        .then((otpCredential) => {
          this.otp = otpCredential.code;
        })
        .catch((err) => console.error('Erreur WebOTP ', err));
    }
  },
};
</script>

<style scoped>
.otp-container {
  display: flex;
  flex-direction: column;
  max-width: 300px;
}
input {
  padding: 8px;
  font-size: 16px;
}
</style>
