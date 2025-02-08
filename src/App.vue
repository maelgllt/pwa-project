<script setup lang="ts">

</script>

<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/camera">Camera</router-link> |
    <router-link to="/location">Location</router-link> |
    <router-link to="/phone">Phone</router-link> |
    <router-link to="/battery">Battery</router-link> |
    <router-link to="/web-otp">Web OTP</router-link> |
    <router-link to="/chat">Chat</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
