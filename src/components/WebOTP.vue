<template>
  <div>
    <h2>Entrez votre code de vérification</h2>
    <label for="otp-input">Code OTP
      <input
        v-model="otpCode"
        type="text"
        id="otp-input"
        autocomplete="one-time-code"
        placeholder="Code OTP"
      />
    </label>
    <button @click="submitForm" :disabled="otpCode.length !== 6">
      Valider
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      otpCode: '',
    };
  },
  methods: {
    submitForm() {
      console.log('OTP soumis :', this.otpCode);
    },
  },
  mounted() {
    if ('OTPCredential' in window) {
      const input = this.$refs.otpInput;
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
        console.log('Erreur lors de la récupération de l\'OTP:', err);
      });
    }
  },
};
</script>
