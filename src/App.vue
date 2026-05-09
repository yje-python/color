<template>

    <Navbar />
    <router-view />

</template>

<script setup>
import Navbar from './layout/Navbar.vue'
import HomeView from './views/HomeView.vue'
import { onMounted } from 'vue'

import { useAuthStore }
  from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.loadUser()
})
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