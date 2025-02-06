<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="otpCode" autocomplete="one-time-code" required />
    <button type="submit">Submit</button>
  </form>
  <p v-if="isSubmitted">Formulaire soumis</p>
</template>

<script>
export default {
  data() {
    return {
      otpCode: '',
      isSubmitted: false,
    };
  },
  mounted() {
    if ('OTPCredential' in window) {
      const input = this.$el.querySelector('input[autocomplete="one-time-code"]');
      if (!input) return;

      const ac = new AbortController();
      const form = input.closest('form');
      if (form) {
        form.addEventListener('submit', () => {
          ac.abort();
        });
      }

      navigator.credentials.get({
        otp: { transport: ['sms'] },
        signal: ac.signal,
      }).then((otp) => {
        this.otpCode = otp.code;
        if (form) form.submit();
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  methods: {
    handleSubmit() {
      console.log('OTP Code:', this.otpCode);
      this.isSubmitted = true;
    },
  },
};
</script>
