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

      <span
        class="magnifying-glass"
        @click="searchHex"
      >
        🔍
      </span>

      <input
        v-model="searchValue"

        class="search-input"

        placeholder="ffffff"

        maxlength="6"

        @keydown="handleKeydown"

        @input="sanitizeHex"

        @compositionstart.prevent

        @paste.prevent

        @keyup.enter="searchHex"
      />

    </div>

    <!-- 버튼 -->
    <div class="button-container">
      <button class="action-button" @click="goRandomPalette">
        랜덤 컬러 팔레트 생성
      </button>

      <button class="action-button" @click="goCategory">
        색상별 모아보기
      </button>

      <button class="action-button" @click="goRandom">
        색상 뽑기
      </button>
    </div>

    <!-- ===== color info ===== -->
    <div class="color-info-row">

      <!-- outline -->
      <div
        class="color-info-card"
        @click="
          router.push(
            `/color/${outlineColor.replace('#', '')}`
          )
        "
      >

        <div
          class="color-preview"
          :style="{
            background: outlineColor
          }"
        ></div>

        <div class="color-info-text">
          <p class="color-label">
            Outline
          </p>

          <p class="color-hex">
            {{ outlineColor }}
          </p>
        </div>

      </div>

      <!-- fill -->
      <div
        class="color-info-card"
        @click="
          router.push(
            `/color/${fillColor.replace('#', '')}`
          )
        "
      >

        <div
          class="color-preview"
          :style="{
            background: fillColor
          }"
        ></div>

        <div class="color-info-text">
          <p class="color-label">
            Fill
          </p>

          <p class="color-hex">
            {{ fillColor }}
          </p>
        </div>

      </div>

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
const goRandomPalette = () => router.push('/random-palette')

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


/* ===== 조화로운 팔레트 ===== */
const randomizeAll = async () => {

  const baseHex =
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')

  try {

    const res = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${baseHex}&mode=analogic&count=10`
    )

    const data = await res.json()

    const sorted =
      [...data.colors].sort(
        (a, b) =>
          b.hsv.value[2] -
          a.hsv.value[2]
      )

    /* 가장 밝은 */
    fillColor.value =
      sorted[0].hex.value

    /* 가장 어두운 */
    outlineColor.value =
      sorted[sorted.length - 1]
        .hex.value
  }

  catch (err) {

    console.error(err)
  }
}

/* ===== 검색 ===== */

const searchValue = ref('')

const handleKeydown = (
  e: KeyboardEvent
) => {

  const allowedKeys = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Tab',
  ]

  /* 제어키 허용 */
  if (
    allowedKeys.includes(e.key)
  ) {
    return
  }

  /* HEX 문자만 허용 */
  const isHex =
    /^[0-9a-fA-F]$/.test(e.key)

  if (!isHex) {
    e.preventDefault()
  }
}
const sanitizeHex = () => {

  searchValue.value =
    searchValue.value
      .replace(/[^0-9a-fA-F]/g, '')
      .slice(0, 6)
}
const searchHex = () => {

  if (
    searchValue.value.length !== 6
  ) {
    return
  }

  router.push(
    `/color/${searchValue.value}`
  )
}
</script>

<style scoped>
.home-view {

  width: 100%;

  min-height: calc(100vh - 70px);

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 120px;
  padding-bottom: 80px;

  box-sizing: border-box;
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

  cursor: pointer;

  transition: 0.2s;
}

.magnifying-glass:hover {
  color: #222;
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

/* ===== color info ===== */
.color-info-row {

  display: flex;
  gap: 20px;

  margin-top: 50px;
}

.color-info-card {

  width: 240px;
  height: 72px;

  padding: 12px 16px;

  display: flex;
  align-items: center;
  gap: 14px;

  background: #fafafa;

  border:
    1px solid #e5e5e5;

  box-shadow:
    2px 2px 6px rgba(0,0,0,0.08);

  cursor: pointer;

  transition: 0.2s;
}

.color-info-card:hover {

  transform: translateY(-3px);

  box-shadow:
    0 8px 18px rgba(0,0,0,0.12);
}

.color-preview {

  width: 48px;
  height: 48px;

  border-radius: 12px;

  border:
    1px solid rgba(0,0,0,0.08);

  flex-shrink: 0;
}

.color-info-text {
  display: flex;
  flex-direction: column;
}

.color-label {

  margin: 0 0 4px;

  font-size: 13px;
  color: #888;

  font-weight: 600;
}

.color-hex {

  margin: 0;

  font-size: 16px;
  font-weight: 700;

  color: #222;
}
</style>