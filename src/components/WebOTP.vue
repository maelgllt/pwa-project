<template>
  <form @submit.prevent="submitForm">
    <input ref="otpInput" autocomplete="one-time-code" v-model="otp" required/>
    <input type="submit">
  </form>
</template>

<script>
export default {
  data() {
    return {
      otp: '',
      ac: new AbortController(),
    };
  },
  mounted() {
    if ('OTPCredential' in window) {
      this.getOTP();
    }
  },
  methods: {
    submitForm() {
      this.ac.abort();
      // Add your form submission logic here
    },
    getOTP() {
      navigator.credentials.get({
        otp: { transport: ['sms'] },
        signal: this.ac.signal,
      }).then((otp) => {
        this.otp = otp.code;
        this.$refs.otpInput.form.submit();
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>
