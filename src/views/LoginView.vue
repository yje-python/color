<template>
  <div class="login-page">

    <div class="login-card">

      <h1 class="title">
        Login
      </h1>

      <div class="input-group">

        <input
          v-model="username"
          class="input"
          placeholder="Username"
        />

        <input
          v-model="password"
          class="input"
          type="password"
          placeholder="Password"
          @keyup.enter="handleLogin"
        />

      </div>

      <p
        v-if="errorMessage"
        class="error-text"
      >
        {{ errorMessage }}
      </p>

      <button
        class="login-button"
        @click="handleLogin"
      >
        로그인
      </button>
          <p
            class="signup-link"
            @click="router.push('/signup')"
          >
            계정이 없나요? 회원가입
          </p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { login }
  from '@/api/accounts'

import { useAuthStore }
  from '@/stores/auth'

const router = useRouter()

const authStore = useAuthStore()

const username = ref('')
const password = ref('')

const errorMessage = ref('')

const handleLogin = async () => {

  errorMessage.value = ''

  try {

    const data = await login(
      username.value,
      password.value,
    )

    authStore.setUser(data)

    router.push('/')

  } catch (err) {

    errorMessage.value =
      '아이디 또는 비밀번호가 올바르지 않습니다.'

    console.error(err)
  }
}
</script>

<style scoped>
.login-page {

  position: fixed;

  top: 50px;
  left: 0;

  width: 100vw;
  height: calc(100vh - 50px);

  display: flex;
  align-items: center;
  justify-content: center;

  overflow-x: hidden;

  background:
    linear-gradient(
      135deg,
      #f5f5f5,
      #e8e8e8
    );

  z-index: 1;
}

.login-card {

  width: 360px;

  padding: 40px;

  background: white;

  border-radius: 24px;

  box-shadow:
    0 12px 30px rgba(0,0,0,0.08);

  display: flex;
  flex-direction: column;

  gap: 24px;
}

.title {

  margin: 0;

  text-align: center;

  font-size: 34px;

  font-weight: 800;

  color: #333;
}

.input-group {

  display: flex;
  flex-direction: column;

  gap: 16px;
}

.input {

  height: 50px;

  padding: 0 16px;

  border:
    1px solid #d9d9d9;

  border-radius: 14px;

  font-size: 16px;

  outline: none;

  transition: 0.2s;
}

.input:focus {

  border-color: #888;

  box-shadow:
    0 0 0 4px rgba(0,0,0,0.05);
}

.login-button {

  height: 52px;

  border: none;

  border-radius: 14px;

  background: #333;

  color: white;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.login-button:hover {

  background: #111;

  transform: translateY(-1px);
}

.login-button:active {

  transform: scale(0.98);
}

.error-text {

  margin: 0;

  color: #d93025;

  font-size: 14px;

  text-align: center;
}
.signup-link {

  margin: 0;

  text-align: center;

  font-size: 14px;

  color: #666;

  cursor: pointer;

  transition: 0.2s;
}

.signup-link:hover {

  color: #111;

  text-decoration: underline;
}
</style>