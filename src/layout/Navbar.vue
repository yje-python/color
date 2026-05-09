<template>
  <div class="navbar">

    <!-- 로고 -->
    <div class="nav-center" @click="goHome">
      <img :src="imgLogo1" class="logo-image" />
    </div>

    <!-- 오른쪽 메뉴 -->
    <div class="nav-right">

      <div
        class="menu-item"
        :class="{ active: route.name === 'random' }"
        @click="goRandom"
      >
        <img :src="imgRandom1" class="icon" />
        <p class="nav-text">색상 뽑기</p>
      </div>

      <div
        class="menu-item"
        :class="{ active: route.name === 'category' }"
        @click="goCategory"
      >
        <img :src="imgCategory1" class="icon" />
        <p class="nav-text">색상별 모아보기</p>
      </div>

      <!-- 로그인 / 로그아웃 -->
      <div
        class="menu-item"
        :class="{ active: route.name === 'login' }"
        @click="handleAuth"
      >
        <img
          :src="authStore.user ? imgLogout : imgLogin"
          class="icon"
        />

        <p class="nav-text">
          {{ authStore.user ? '로그아웃' : '로그인' }}
        </p>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

import { useAuthStore }
  from '@/stores/auth'

import imgLogo1 from '../assets/logo.png'
import imgCategory1 from '../assets/category.png'
import imgRandom1 from '../assets/random.png'

import imgLogin from '../assets/login.png'
import imgLogout from '../assets/logout.png'

const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()

/* 이동 */
const goHome = () => {
  router.push('/')
}

const goRandom = () => {
  router.push('/random')
}

const goCategory = () => {
  router.push('/category')
}

/* 로그인 / 로그아웃 */
const handleAuth = () => {

  if (authStore.user) {

    authStore.logout()

    router.push('/')

    return
  }

  router.push('/login')
}
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 70px;
  background-color: #f5f5f5;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding: 0 40px;

  box-sizing: border-box;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  left: 0;

  z-index: 1000;
}

/* 가운데 로고 */
.nav-center {
  position: absolute;

  left: 50%;
  top: 55%;

  transform: translate(-50%, -50%);

  cursor: pointer;
}

/* 오른쪽 메뉴 */
.nav-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

/* 메뉴 아이템 */
.menu-item {
  display: flex;
  align-items: center;
  gap: 6px;

  cursor: pointer;

  padding: 6px 10px;

  border-radius: 8px;

  transition: all 0.2s ease;
}

/* hover */
.menu-item:hover {
  background-color: #e8e8e8;
}

/* hover 텍스트 */
.menu-item:hover .nav-text {
  color: #333;
}

/* active */
.menu-item.active {
  background-color: #dcdcdc;
}

/* active 텍스트 */
.menu-item.active .nav-text {
  color: #111;
}

/* 로고 */
.logo-image {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

/* 텍스트 */
.nav-text {
  font-family:
    'Inter',
    'Noto Sans KR',
    sans-serif;

  font-weight: bold;

  font-size: 18px;

  white-space: nowrap;

  color: #555;

  transition: color 0.2s ease;
}

/* 아이콘 */
.icon {
  width: 24px;
  height: 24px;
}
</style>