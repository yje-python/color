<template>
  <div class="home-view">

    <!-- 🔥 COLOR 타이틀 -->
    <div
      class="title-section"
      @click="randomizeAll"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <div
        v-for="(item, i) in letters"
        :key="i"
        class="letter-wrapper"
      >

        <!-- 내부 색 -->
        <div
          class="letter-fill"
          :class="{ wave: hover }"
          :style="getFillStyle(item.fill, i)"
        />

        <!-- 테두리 색 -->
        <div
          class="letter-outline"
          :class="{ wave: hover }"
          :style="getOutlineStyle(item.outline, i)"
        />

      </div>
    </div>

    <!-- 검색창 -->
    <div class="search-box">
      <span class="magnifying-glass">🔍</span>
      <input class="search-input" placeholder="검색" />
    </div>

    <!-- 버튼 -->
    <div class="button-container">
      <button class="action-button">
        랜덤 컬러 팔레트 생성
      </button>

      <button class="action-button" @click="goCategory">
        색상별 모아보기
      </button>

      <button class="action-button" @click="goRandom">
        색상 뽑기
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

/* outline */
import c from '@/assets/title_c.png'
import o1 from '@/assets/title_o1.png'
import l from '@/assets/title_l.png'
import o2 from '@/assets/title_o2.png'
import r from '@/assets/title_r.png'
import s from '@/assets/title_s.png'

/* fill */
import cf from '@/assets/title_c_f.png'
import o1f from '@/assets/title_o1_f.png'
import lf from '@/assets/title_l_f.png'
import o2f from '@/assets/title_o2_f.png'
import rf from '@/assets/title_r_f.png'
import sf from '@/assets/title_s_f.png'

const router = useRouter()

const goCategory = () => router.push('/category')
const goRandom = () => router.push('/random')

/* 🔥 이미지 세트 */
const letters = [
  { outline: c, fill: cf },
  { outline: o1, fill: o1f },
  { outline: l, fill: lf },
  { outline: o2, fill: o2f },
  { outline: r, fill: rf },
  { outline: s, fill: sf },
]

/* hover 상태 */
const hover = ref(false)

/* 색상 */
const fillColor = ref('#ffffff')
const outlineColor = ref('#000000')

/* 내부 */
const getFillStyle = (img: string, i: number) => ({
  background: fillColor.value,

  maskImage: `url(${img})`,
  WebkitMaskImage: `url(${img})`,

  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',

  maskSize: 'contain',
  WebkitMaskSize: 'contain',

  maskPosition: 'center',
  WebkitMaskPosition: 'center',

  animationDelay: `${i * 0.12}s`
})

/* 테두리 */
const getOutlineStyle = (img: string, i: number) => ({
  background: outlineColor.value,

  maskImage: `url(${img})`,
  WebkitMaskImage: `url(${img})`,

  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',

  maskSize: 'contain',
  WebkitMaskSize: 'contain',

  maskPosition: 'center',
  WebkitMaskPosition: 'center',

  animationDelay: `${i * 0.12}s`
})

/* 랜덤 색 */
const randomHex = () =>
  '#' +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')

const randomizeAll = () => {
  fillColor.value = randomHex()
  outlineColor.value = randomHex()
}
</script>

<style scoped>
.home-view {
  width: 100vw;
  min-height: calc(100vh - 70px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* ===== 타이틀 ===== */
.title-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  cursor: pointer;
}

/* wrapper */
.letter-wrapper {
  position: relative;

  width: 120px;
  height: 120px;

  display: flex;
  justify-content: center;
  align-items: center;
}

/* 공통 */
.letter-fill,
.letter-outline {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  image-rendering: pixelated;
}

/* 내부 */
.letter-fill {
  z-index: 1;
}

/* 테두리 */
.letter-outline {
  z-index: 2;
}

/* wave */
.wave {
  animation: waveAnim 0.8s ease-in-out infinite;
}

@keyframes waveAnim {
  0%   { transform: translateY(0); }
  30%  { transform: translateY(-12px); }
  60%  { transform: translateY(0); }
  100% { transform: translateY(0); }
}

/* ===== 검색창 ===== */
.search-box {
  width: 600px;
  height: 50px;

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 0 16px;

  background-color: #fafafa;
  border: 1px solid #e5e5e5;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.1);

  margin-bottom: 60px;
}

.search-input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 18px;
  background: transparent;
}

.magnifying-glass {
  font-size: 18px;
  color: #888;
}

/* ===== 버튼 ===== */
.button-container {
  display: flex;
  gap: 30px;
}

.action-button {
  width: 260px;
  height: 50px;

  background-color: #fafafa;
  border: 1px solid #e5e5e5;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.1);

  font-weight: bold;
  font-size: 16px;

  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover {
  background-color: #f0f0f0;
}
</style>