<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './layout/Navbar.vue'
import HomeView from './views/HomeView.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}
body {
  overflow-x: hidden;
}
</style>