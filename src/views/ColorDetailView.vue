<template>
  <div class="color-detail-view">

    <!-- 배경 -->
    <div
      class="hero-bg"
      :style="{
        background: hexToRgba(currentHex, 0.75)
      }"
    />

    <!-- 컨텐츠 -->
    <div class="detail-container">

      <div class="content-scroll">

        <!-- 상단 카드 -->
        <div class="top-row">

          <div class="color-card">
            <div
              class="color-preview"
              :style="{ background: currentHex }"
            />
            <div class="color-code">
              {{ currentHex }}
            </div>
            <div class="tag-container">
              <span class="tag"
                :style="categoryStyle"
                    >
                {{ colorCategory }}
              </span>
              <span class="tag"
              :style="brightnessStyle"
              >
              {{ brightness }}
            </span>
            </div>

          </div>

          <div
            class="favorite-badge"
            :class="{ active: isFavorite }"
            @click="toggleFavorite"
          >
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path class="star"
                d="M12 17.27L18.18 21 16.54 13.97 
                  22 9.24 14.81 8.63 12 2 
                  9.19 8.63 2 9.24 7.46 
                  13.97 5.82 21z"/>
            </svg>
          </div>

          <!-- 차트 묶음 -->
          <div class="chart-wrapper">
                <div class="chart-row">
                  <div class="chart-card">
                    <p class="chart-title">RGB</p>
                    <div class="bar red">
                      <span class="label">R</span>

                      <div class="bar-track">
                        <div
                          class="bar-fill"
                          :style="{
                            width: `${(colorData?.rgb.r / 255) * 100}%`
                          }"
                        />
                      </div>

                      <span class="value">
                        {{ colorData?.rgb.r }}
                      </span>
                    </div>
                    <div class="bar green">
                      <span class="label">G</span>
                      <div class="bar-track">
                        <div
                          class="bar-fill"
                          :style="{
                            width: `${(colorData?.rgb.g / 255) * 100}%`
                          }"
                        />
                      </div>
                      <span class="value">
                        {{ colorData?.rgb.g }}
                      </span>
                    </div>
                    <div class="bar blue">
                      <span class="label">B</span>
                      <div class="bar-track">
                        <div
                          class="bar-fill"
                          :style="{
                            width: `${(colorData?.rgb.b / 255) * 100}%`
                          }"
                        />
                      </div>
                      <span class="value">
                        {{ colorData?.rgb.b }}
                      </span>
                    </div>
                  </div>

                  <div class="chart-card">
                    <p class="chart-title">CMYK</p>
                    <div class="bar cyan">
                      <span class="label">C</span>
                      <div class="bar-track">
                        <div
                          class="bar-fill"
                          :style="{
                            width: `${(colorData?.cmyk.c / 100) * 100}%`
                          }"
                        />
                      </div>
                      <span class="value">
                        {{ colorData?.cmyk.c }}
                      </span>
                    </div>
                    <div class="bar magenta">
                      <span class="label">M</span>
                      <div class="bar-track">
                        <div
                          class="bar-fill"
                          :style="{
                            width: `${(colorData?.cmyk.m / 100) * 100}%`
                          }"
                        />
                      </div>
                      <span class="value">
                        {{ colorData?.cmyk.m }}
                      </span>
                    </div>
                    <div class="bar yellow">
                      <span class="label">Y</span>
                      <div class="bar-track">
                        <div
                          class="bar-fill"
                          :style="{
                            width: `${(colorData?.cmyk.y / 100) * 100}%`
                          }"
                        />
                      </div>
                      <span class="value">
                        {{ colorData?.cmyk.y }}
                      </span>
                    </div>
                    <div class="bar black">
                      <span class="label">K</span>
                      <div class="bar-track">
                        <div
                          class="bar-fill"
                          :style="{
                            width: `${(colorData?.cmyk.k / 100) * 100}%`
                          }"
                        />
                      </div>
                      <span class="value">
                        {{ colorData?.cmyk.k }}
                      </span>
                    </div>
                  </div>
                </div>

            <!-- 🔥 이동된 위치 -->
            <div
              class="title-band"

              :style="titleBandStyle"
            >
              {{ colorData?.name.value }}
            </div>

          </div>

        </div>

        <!-- 정보 -->
        <div class="info-table">

          <div
            class="info-item"
            v-for="item in infoList"
            :key="item.label"
            @click="handleCopy(item.value, item.label)"
          >
            <div class="row">
              <span class="label">{{ item.label }}</span>
              <span class="info">{{ item.value }}</span>
            </div>

            <!-- overlay -->
            <div
              class="copied-overlay"
              :class="{ active: copiedKey === item.label }"
            >
              Copied
            </div>
          </div>

        </div>

        <!-- 유사한 색 -->
        <div class="similar-section">
          <p class="sub-title">유사한 색</p>
          <div class="similar-list">

            <div
              v-for="color in similarColors"
              :key="color"
              class="similar-chip"
              :style="{ background: color }"
              @click="router.push(`/color/${color.replace('#', '')}`)"
            >
              <div class="overlay">
                {{ color }}
              </div>

            </div>

          </div>
        </div>

        <!-- 컬러팔레트 (복구) -->
        <div class="palette-section">
          <p class="sub-title">컬러팔레트</p>

        <div class="palette-buttons">

          <button
            :class="{ active: selectedPalette === 'monochrome' }"
            @click="setPalette('monochrome')"
          >
            단색 계열
          </button>

          <button
            :class="{ active: selectedPalette === 'analogic' }"
            @click="setPalette('analogic')"
          >
            유사한 색
          </button>

          <button
            :class="{ active: selectedPalette === 'complement' }"
            @click="setPalette('complement')"
          >
            보색
          </button>

          <button
            :class="{ active: selectedPalette === 'triad' }"
            @click="setPalette('triad')"
          >
            삼각
          </button>

          <button
            :class="{ active: selectedPalette === 'quad' }"
            @click="setPalette('quad')"
          >
            사각
          </button>

        </div>

          <div class="palette-row">
            <div
              v-for="color in paletteColors"
              :key="color"
              :style="{ background: color }"
              @click="goPaletteDetail"
            />
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import {
  likeColor,
  getLikedColors,
  unlikeColor,
} from '@/api/colors'

const route = useRoute()
const router = useRouter()
import { useAuthStore }
  from '@/stores/auth'

const authStore = useAuthStore()

const isFavorite = ref(false)
const checkFavorite = async () => {

  if (!authStore.user) {
    return
  }

  const USER_ID = authStore.user.id

  try {

    const likedColors =
      await getLikedColors()

    isFavorite.value =
      likedColors.some(
        (item: any) =>
          item.user === USER_ID &&
          item.hex_code.toLowerCase()
          === currentHex.value.toLowerCase()
      )

  } catch (err) {
    console.error(err)
  }
}

const toggleFavorite = async () => {

  if (!authStore.user) {

    alert('로그인이 필요합니다')

    return
  }

  const USER_ID = authStore.user.id

  try {

    if (isFavorite.value) {

      await unlikeColor(
        USER_ID,
        currentHex.value
      )

      isFavorite.value = false

      return
    }

    await likeColor(
      USER_ID,
      currentHex.value
    )

    isFavorite.value = true

  } catch (err) {
    console.error(err)
  }
}

const selectedPalette = ref('monochrome')

const setPalette = async (type: string) => {
  selectedPalette.value = type
  await fetchPalette()
}

const colorData = ref<any>(null)

const paletteColors = ref<string[]>([])

const copiedKey = ref<string | null>(null)

const currentHex = computed(() => {
  return `#${route.params.hex}`
})

const fetchColor = async () => {
  try {

    const res = await axios.get(
      `https://www.thecolorapi.com/id?hex=${route.params.hex}`
    )

    colorData.value = res.data

    await fetchPalette()

    await fetchSimilarColors()

    await checkFavorite()

  } catch (err) {
    console.error(err)
  }
}

const similarColors = ref<string[]>([])

const fetchSimilarColors = async () => {

  const res = await axios.get(
    `https://www.thecolorapi.com/scheme?hex=${route.params.hex}&mode=monochrome&count=6`
  )

  similarColors.value =
    res.data.colors.map(
      (c: any) => c.hex.value
    )
}

const fetchPalette = async () => {
  try {
    const res = await axios.get(
      `https://www.thecolorapi.com/scheme?hex=${route.params.hex}&mode=${selectedPalette.value}&count=5`
    )

    paletteColors.value = res.data.colors.map(
      (c: any) => c.hex.value
    )

  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchColor)

watch(
  () => route.params.hex,
  fetchColor
)

const brightness = computed(() => {
  if (!colorData.value) return ''

  return colorData.value.contrast.value === '#000000'
    ? 'Light'
    : 'Dark'
})

const colorCategory = computed(() => {
  if (!colorData.value) return ''

  const hue = colorData.value.hsl.h

  if (hue < 18) return 'Red'
  if (hue < 36) return 'Orange'
  if (hue < 54) return 'Yellow'
  if (hue < 90) return 'Lime'
  if (hue < 150) return 'Green'
  if (hue < 210) return 'Teal'
  if (hue < 240) return 'Blue'
  if (hue < 270) return 'Navy'
  if (hue < 300) return 'Purple'
  if (hue < 330) return 'Pink'

  return 'Red'
})

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const categoryStyle = computed(() => {
  return {
    background: hexToRgba(currentHex.value, 0.15),
    color: currentHex.value,
    border: `1px solid ${hexToRgba(currentHex.value, 0.4)}`
  }
})

const brightnessStyle = computed(() => {
  return brightness.value === 'Light'
    ? {
        background: '#f5f5f5',
        color: '#333'
      }
    : {
        background: '#333',
        color: '#fff'
      }
})

/* ===== title band ===== */

const titleBandStyle = computed(() => {

  if (!colorData.value) {
    return {}
  }

  const h =
    colorData.value.hsl.h

  const s =
    colorData.value.hsl.s

  const l =
    colorData.value.hsl.l

  /* 밝은 색 여부 */
  const isLight = l >= 60

  /* 같은 hue 유지 */
  const bg = isLight

    /* 밝은 색 -> 극도로 어두운 배경 */
    ? `hsl(${h}, ${Math.max(s - 10, 20)}%, 12%)`

    /* 어두운 색 -> 극도로 밝은 배경 */
    : `hsl(${h}, ${Math.max(s - 20, 15)}%, 92%)`

  return {
    background: bg,

    color: currentHex.value,

    border: `1px solid ${hexToRgba(currentHex.value, 0.2)}`,

    boxShadow:
      `0 6px 16px ${hexToRgba(currentHex.value, 0.18)}`
  }
})

const infoList = computed(() => {
  if (!colorData.value) return []

  return [
    {
      label: 'HEX',
      value: colorData.value.hex.value
    },
    {
      label: 'RGB',
      value: `${colorData.value.rgb.r}, ${colorData.value.rgb.g}, ${colorData.value.rgb.b}`
    },
    {
      label: 'HSL',
      value: `${colorData.value.hsl.h}°, ${colorData.value.hsl.s}%, ${colorData.value.hsl.l}%`
    },
    {
      label: 'HSV',
      value: `${colorData.value.hsv.h}°, ${colorData.value.hsv.s}%, ${colorData.value.hsv.v}%`
    },
    {
      label: 'CMYK',
      value: `${colorData.value.cmyk.c}, ${colorData.value.cmyk.m}, ${colorData.value.cmyk.y}, ${colorData.value.cmyk.k}`
    },
    {
      label: 'XYZ',
      value: `${colorData.value.XYZ.X}, ${colorData.value.XYZ.Y}, ${colorData.value.XYZ.Z}`
    }
  ]
})

const handleCopy = async (text: string, key: string) => {
  await navigator.clipboard.writeText(text)

  copiedKey.value = key

  setTimeout(() => {
    copiedKey.value = null
  }, 1000)
}

const goPaletteDetail = () => {

  router.push({
    path: '/palette',
    query: {
      colors: paletteColors.value.join(',')
    }
  })
}
</script>

<style scoped>
.color-detail-view {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.tag-container {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  justify-content: center;
}

.tag {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

/* 부제목 */
.sub-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* 배경 */
.hero-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 20vh;
  background: rgba(87,187,148,0.75);
  z-index: 0;
}

/* 핵심: 컨테이너 위치 고정 */
.detail-container {
  position: fixed;
  top: 15vh;   /* 여기서 멈춤 */
  left: 0;
  width: 100%;
  height: 70vh;

  background: #fff;
  border-radius: 30px 30px 0 0;

  display: flex;
  justify-content: center;
  z-index: 1;
}

/* 내부만 스크롤 */
.content-scroll {
  width: 100%;
  max-width: 1100px;
  height: 100%;

  overflow-y: auto;
  padding: 40px 30px;

  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 상단 */
.top-row {
  display: flex;
  gap: 30px;
}

.color-card {
  width: 150px;
  background: #fff;
  box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
}

.color-preview {
  height: 150px;
  background: #57bb94;
}

.color-code {
  padding: 10px;
  font-weight: bold;
}

/* 즐겨찾기 */
.favorite-badge {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 기본 상태 */
.star {
  fill: #777;
}

/* active */
.favorite-badge.active {
  background: #ffe082;
}

.favorite-badge.active .star {
  fill: #ffb300;
}

/* 차트 */
.chart-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.chart-row {
  display: flex;
  gap: 20px;
}

.chart-title {
  font-weight: bold;
  margin-bottom: 8px;
  color: #000;
}

.chart-card {
  flex: 1;
  max-width: 520px;
  padding: 12px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
}

.bar {
  display: grid;

  grid-template-columns:
    40px
    minmax(280px, 420px)
    42px;

  align-items: center;

  gap: 8px;

  margin: 18px 0;
}

.label {
  width: 40px;

  font-weight: bold;

  color: #000;

  font-size: 18px;

  text-align: center;
}

.value {
  width: 42px;

  text-align: right;

  font-weight: 700;

  font-size: 18px;

  color: #5f5f5f !important;

  font-variant-numeric: tabular-nums;
}

.bar-track {
  width: 100%;

  height: 22px;

  background: #d9d9d9;

  border-radius: 999px;

  overflow: hidden;

  position: relative;
}

.bar-fill {
  position: absolute;

  top: 0;
  left: 0;

  height: 100%;

  border-radius: 999px;

  transition: width 0.35s ease;
}

/* 색상 */
.red .bar-fill {
  background: red;
}

.green .bar-fill {
  background: #7CFF3A;
}

.blue .bar-fill {
  background: blue;
}

.cyan .bar-fill {
  background: cyan;
}

.magenta .bar-fill {
  background: magenta;
}

.yellow .bar-fill {
  background: yellow;
}

.black .bar-fill {
  background: black;
}

/* 타이틀 */
.title-band {
  width: 97.5%;
  background:#0f2a23;
  color:#57bb94;
  text-align:center;
  padding:10px;
  font-weight:bold;
}

/* 정보 */
.info-table {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.info-item {
  position: relative;
  padding: 8px;
  background: #fafafa;
  cursor: pointer;
  overflow: hidden;

  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

/* 값 + 버튼 */
.value-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info {
  font-weight: 600;
  color: #5f5f5f !important;
  margin-left: 16px;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;          /* 추가 */
  padding: 0 4px; 
  height: 20px;
}

/* overlay */
.copied-overlay {
  position: absolute;
  inset: 0;

  background: rgba(0,0,0,0.8);
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;

  opacity: 0;
  transition: 0.2s;
}

.copied-overlay.active {
  opacity: 1;
}

/* 유사 색 */
.similar-list {
  display:flex;
  gap:28px;
  justify-content: center;
}

.similar-chip {
  width:120px;
  height:120px;
  border-radius:50%;
  position:relative;
  cursor: pointer;
  transition: 0.2s;
}

.overlay {
  position:absolute;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  background:rgba(102,102,102,0.6);
  border-radius:50%;
  color:#fff;
  opacity:0;
  font-weight: bold;
}

.similar-chip:hover {
  transform: scale(1.06);
}

.similar-chip:hover .overlay {
  opacity:1;
}

/* 팔레트 */
.palette-buttons {
  display:flex;
  gap:10px;
  margin-bottom: 16px;
  justify-content: center;
}

.palette-buttons button {
  padding:8px 14px;
  border-radius:20px;
  border:none;
  background:#ccc;
}

.palette-buttons .active {
  background:#888;
  color:#fff;
}

.palette-row {
  display: flex;
  justify-content: center;

  width: 100%;
  max-width: 900px;

  margin: 0 auto;

  overflow: hidden;

  border-radius: 18px;
}

.palette-row div {
  flex: 1;

  height: 140px;

  min-width: 0;

  transition: 0.2s;
}

.palette-row div:hover {
  transform: scaleY(1.03);
}
</style>