<template>
  <div class="signup-page">

    <div class="signup-card">

      <h1 class="title">
        Sign Up
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
        />

        <input
          v-model="confirmPassword"
          class="input"
          type="password"
          placeholder="Confirm Password"
          @keyup.enter="handleSignup"
        />

      </div>

      <p
        v-if="errorMessage"
        class="error-text"
      >
        {{ errorMessage }}
      </p>

      <button
        class="signup-button"
        @click="handleSignup"
      >
        회원가입
      </button>

      <p
        class="login-link"
        @click="router.push('/login')"
      >
        이미 계정이 있나요? 로그인
      </p>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { signup }
  from '@/api/accounts'

const router = useRouter()

const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const errorMessage = ref('')

const handleSignup = async () => {

  errorMessage.value = ''

  if (
    !username.value ||
    !password.value ||
    !confirmPassword.value
  ) {

    errorMessage.value =
      '모든 항목을 입력해주세요.'

    return
  }

  if (
    password.value !==
    confirmPassword.value
  ) {

    errorMessage.value =
      '비밀번호가 일치하지 않습니다.'

    return
  }

  try {

    await signup(
      username.value,
      password.value,
    )

    alert('회원가입이 완료되었습니다.')

    router.push('/login')

  } catch (err) {

    errorMessage.value =
      '이미 존재하는 아이디입니다.'

    console.error(err)
  }
}
</script>

<style scoped>
.signup-page {

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
}

.signup-card {

  width: 380px;

  padding: 42px;

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

  height: 52px;

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

.signup-button {

  height: 54px;

  border: none;

  border-radius: 14px;

  background: #333;

  color: white;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.signup-button:hover {

  background: #111;

  transform: translateY(-1px);
}

.signup-button:active {

  transform: scale(0.98);
}

.error-text {

  margin: 0;

  color: #d93025;

  font-size: 14px;

  text-align: center;
}

.login-link {

  margin: 0;

  text-align: center;

  font-size: 14px;

  color: #666;

  cursor: pointer;

  transition: 0.2s;
}

.login-link:hover {

  color: #111;

  text-decoration: underline;
}
</style>