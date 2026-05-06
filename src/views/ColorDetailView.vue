<template>
  <div class="color-detail-view">

    <!-- 배경 -->
    <div class="hero-bg"></div>

    <!-- 컨텐츠 -->
    <div class="detail-container">

      <div class="content-scroll">

        <!-- 상단 카드 -->
        <div class="top-row">

          <div class="color-card">
            <div class="color-preview"></div>
            <div class="color-code">#57bb94</div>
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
                      <div class="bar-track"><div class="bar-fill"></div></div>
                      <span class="value">34</span>
                    </div>
                    <div class="bar green">
                      <span class="label">G</span>
                      <div class="bar-track"><div class="bar-fill"></div></div>
                      <span class="value">73</span>
                    </div>
                    <div class="bar blue">
                      <span class="label">B</span>
                      <div class="bar-track"><div class="bar-fill"></div></div>
                      <span class="value">58</span>
                    </div>
                  </div>

                  <div class="chart-card">
                    <p class="chart-title">CMYK</p>
                    <div class="bar cyan">
                      <span class="label">C</span>
                      <div class="bar-track"><div class="bar-fill"></div></div>
                      <span class="value">53</span>
                    </div>
                    <div class="bar magenta">
                      <span class="label">M</span>
                      <div class="bar-track"><div class="bar-fill"></div></div>
                      <span class="value">0</span>
                    </div>
                    <div class="bar yellow">
                      <span class="label">Y</span>
                      <div class="bar-track"><div class="bar-fill"></div></div>
                      <span class="value">21</span>
                    </div>
                    <div class="bar black">
                      <span class="label">K</span>
                      <div class="bar-track"><div class="bar-fill"></div></div>
                      <span class="value">27</span>
                    </div>
                  </div>
                </div>

            <!-- 🔥 이동된 위치 -->
            <div class="title-band">Lime Green</div>

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
              <span class="value">{{ item.value }}</span>
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
            <div class="similar-chip" v-for="i in 5" :key="i">
              <div class="overlay">#57bb7b</div>
            </div>
          </div>
        </div>

        <!-- 컬러팔레트 (복구) -->
        <div class="palette-section">
          <p class="sub-title">컬러팔레트</p>

        <div class="palette-buttons">

          <button
            :class="{ active: selectedPalette === 'mono' }"
            @click="setPalette('mono')"
          >
            단색 계열
          </button>

          <button
            :class="{ active: selectedPalette === 'analogous' }"
            @click="setPalette('analogous')"
          >
            유사한 색
          </button>

          <button
            :class="{ active: selectedPalette === 'complementary' }"
            @click="setPalette('complementary')"
          >
            보색
          </button>

          <button
            :class="{ active: selectedPalette === 'triadic' }"
            @click="setPalette('triadic')"
          >
            삼각
          </button>

          <button
            :class="{ active: selectedPalette === 'tetradic' }"
            @click="setPalette('tetradic')"
          >
            사각
          </button>

        </div>

          <div class="palette-row">
            <div style="background:#398d6c"></div>
            <div style="background:#409f7a"></div>
            <div style="background:#48b188"></div>
            <div style="background:#57bb94"></div>
            <div style="background:#69c2a0"></div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { computed } from 'vue'

const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const selectedPalette = ref('mono')

const setPalette = (type: string) => {
  selectedPalette.value = type
}

const hex = '#57BB94'

const rgb = computed(() => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
})

const brightness = computed(() => {
  const { r, g, b } = rgb.value
  const luminance = (0.299*r + 0.587*g + 0.114*b) / 255
  return luminance > 0.5 ? 'Light' : 'Dark'
})

const colorCategory = computed(() => {
  const { r, g, b } = rgb.value

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  if (delta < 10) {
    if (max < 50) return 'Black'
    if (max > 200) return 'White'
    return 'Gray'
  }

  let hue = 0

  if (max === r) hue = ((g - b) / delta) % 6
  else if (max === g) hue = (b - r) / delta + 2
  else hue = (r - g) / delta + 4

  hue = Math.round(hue * 60)
  if (hue < 0) hue += 360

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

/* ===== 태그 색상 자동 ===== */

/* HEX → RGBA */
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/* 카테고리 태그 */
const categoryStyle = computed(() => {
  return {
    background: hexToRgba(hex, 0.15),
    color: hex,
    border: `1px solid ${hexToRgba(hex, 0.4)}`
  }
})

/* 밝기 태그 */
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

const copiedKey = ref<string | null>(null)

const infoList = [
  { label: 'HEX', value: '#57bb94' },
  { label: 'HSV', value: '156.6°, 53.5, 73.3' },
  { label: 'RGB', value: '87, 187, 148' },
  { label: 'HSL', value: '156.6°, 42.4, 53.7' },
  { label: 'CMYK', value: '53, 0, 21, 27' },
  { label: 'XYZ', value: '27.044, 39.703, 34.254' }
]

const handleCopy = async (text: string, key: string) => {
  await navigator.clipboard.writeText(text)

  copiedKey.value = key

  setTimeout(() => {
    copiedKey.value = null
  }, 1000)
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
  width: 80%;
  padding: 12px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
}

.bar {
  display: flex;
  align-items: center;
  gap: 10px;           /* 요소 간격 */
  margin: 10px 0;
}

.label {
  font-weight: bold;
  color: #000;
  flex-shrink: 0; 
}

.value {
  font-weight: 600;
  color: #fff;
  text-align: right;
  white-space: nowrap;      /* 줄바꿈 금지 */
  overflow: hidden;
  text-overflow: ellipsis;  /* 넘치면 ... */
  max-width: 60%;           /* 영역 제한 */
}

.bar-track {
  flex: 1;
  height: 12px;
  background: #eee;
  border-radius: 6px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
}

/* 색상 */
.red .bar-fill { background: red; width: 30%; }
.green .bar-fill { background: #7CFF3A; width: 70%; }
.blue .bar-fill { background: blue; width: 50%; }

.cyan .bar-fill { background: cyan; width: 60%; }
.magenta .bar-fill { background: magenta; width: 5%; }
.yellow .bar-fill { background: yellow; width: 20%; }
.black .bar-fill { background: black; width: 30%; }

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

.value {
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
  gap:20px;
  justify-content: center;
}

.similar-chip {
  width:80px;
  height:80px;
  border-radius:50%;
  background:#57bb7b;
  position:relative;
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
  display:flex;
  justify-content: center;
}

.palette-row div {
  width:60px;
  height:80px;
}
</style>