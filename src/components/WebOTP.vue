<template>
  <form @submit.prevent="submitForm">
    <input v-model="otpCode" autocomplete="one-time-code" required ref="otpInput" />
    <button type="submit">Envoyer</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      otpCode: '',
      abortController: null,
    };
  },
  methods: {
    submitForm() {
      if (this.abortController) {
        this.abortController.abort();
      }
      alert(`Code OTP soumis: ${this.otpCode}`);
    },
    async requestOTP() {
      if ('OTPCredential' in window) {
        this.abortController = new AbortController();
        try {
          const otp = await navigator.credentials.get({
            otp: { transport: ['sms'] },
            signal: this.abortController.signal,
          });
          if (otp) {
            this.otpCode = otp.code;
            this.$refs.otpInput.form.submit();
          }
        } catch (error) {
          console.error('Erreur OTP: ', error);
        }
      }
    },
  },
  mounted() {
    this.requestOTP();
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
