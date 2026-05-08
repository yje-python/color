<template>
  <div class="layout">

    <!-- 🔥 사이드바 -->
    <Sidebar />

    <!-- 🔥 메인 컨텐츠 -->
    <main class="category-page">

      <div class="category-header">

        <!-- 선택된 색 -->
        <div class="category-badge">
          {{ selectedCategory }}
        </div>

        <!-- 밝기 필터 -->
        <div class="filter-buttons">
          <button
            :class="{ active: brightness === 'all' }"
            @click="setBrightness('all')"
          >
            All
          </button>

          <button
            :class="{ active: brightness === 'light' }"
            @click="setBrightness('light')"
          >
            Light
          </button>

          <button
            :class="{ active: brightness === 'dark' }"
            @click="setBrightness('dark')"
          >
            Dark
          </button>
        </div>

      </div>

      <!-- 색상 카드 -->
      <div class="color-grid">
        <div
          v-for="color in filteredColors"
          :key="color.code"
          class="color-card"
        >
          <div
            class="color-preview"
            :style="{ backgroundColor: color.code }"
          />
          <p class="color-code">{{ color.code }}</p>
        </div>
      </div>

    </main>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Sidebar from '@/views/Sidebar.vue'
import { useColorStore } from '@/stores/color'

import { BASE_COLOR_RANGES } from '@/constants/baseColors'
import { ACHROMATIC_RULES } from '@/constants/colorRules'
import { STYLE_RULES } from '@/constants/styleRules'

const colorStore = useColorStore()

const brightness = ref<'all' | 'light' | 'dark'>('all')

/* ===== 전체 색상 자동 생성 ===== */
const allColors = computed(() => {

  const colors: {
    code: string
    category: string
    tone: string
    styles: string[]
  }[] = []

  for (let r = 0; r <= 255; r += 16) {

    for (let g = 0; g <= 255; g += 16) {

      for (let b = 0; b <= 255; b += 16) {

        const hex =
          `#${r.toString(16).padStart(2, '0')}` +
          `${g.toString(16).padStart(2, '0')}` +
          `${b.toString(16).padStart(2, '0')}`

        colors.push({
          code: hex,

          category: getCategory(hex),

          tone: getTone(hex),

          styles: getStyles(hex),
        })
      }
    }
  }

  return colors
})

/* ===== HEX -> HSV ===== */
const hexToHSV = (hex: string) => {

  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  const delta = max - min

  let h = 0

  if (delta !== 0) {

    if (max === r) {
      h = ((g - b) / delta) % 6
    }
    else if (max === g) {
      h = (b - r) / delta + 2
    }
    else {
      h = (r - g) / delta + 4
    }

    h *= 60

    if (h < 0) {
      h += 360
    }
  }

  const s = max === 0
    ? 0
    : (delta / max) * 100

  const v = max * 100

  return {
    h,
    s,
    v,
  }
}

/* ===== 무채색 분류 ===== */
const getAchromaticCategory = (
  s: number,
  v: number,
) => {

  if (
    v <= ACHROMATIC_RULES.black.maxV
  ) {
    return 'black'
  }

  if (
    v >= ACHROMATIC_RULES.white.minV &&
    s <= ACHROMATIC_RULES.white.maxS
  ) {
    return 'white'
  }

  if (
    s <= ACHROMATIC_RULES.gray.maxS
  ) {
    return 'gray'
  }

  return null
}

/* ===== 유채색 분류 ===== */
const getChromaticCategory = (
  h: number,
) => {

  for (const color of BASE_COLOR_RANGES) {

    if (color.name === 'red') {

      if (
        h >= color.min ||
        h < color.max
      ) {
        return color.name
      }
    }

    else {

      if (
        h >= color.min &&
        h < color.max
      ) {
        return color.name
      }
    }
  }

  return 'unknown'
}

/* ===== 최종 카테고리 ===== */
const getCategory = (hex: string) => {

  const { h, s, v } = hexToHSV(hex)

  const achromatic = getAchromaticCategory(
    s,
    v,
  )

  if (achromatic) {
    return achromatic
  }

  return getChromaticCategory(h)
}

/* ===== Tone ===== */
const getTone = (hex: string) => {

  const { v } = hexToHSV(hex)

  if (v >= 75) {
    return 'light'
  }

  if (v > 35) {
    return 'normal'
  }

  return 'dark'
}

/* ===== Style ===== */
const getStyles = (hex: string) => {

  const { h, s, v } = hexToHSV(hex)

  const styles: string[] = []

  /* vivid */
  if (
    s >= STYLE_RULES.vivid.minS &&
    v >= STYLE_RULES.vivid.minV
  ) {
    styles.push('vivid')
  }

  /* muted */
  if (
    s >= STYLE_RULES.muted.minS &&
    s < STYLE_RULES.muted.maxS
  ) {
    styles.push('muted')
  }

  /* pastel */
  if (
    v >= STYLE_RULES.pastel.minV &&
    s < STYLE_RULES.pastel.maxS
  ) {
    styles.push('pastel')
  }

  /* neon */
  if (
    v >= STYLE_RULES.neon.minV &&
    s >= STYLE_RULES.neon.minS
  ) {
    styles.push('neon')
  }

  /* vintage */
  if (
    s < STYLE_RULES.vintage.maxS &&
    v >= STYLE_RULES.vintage.minV &&
    v < STYLE_RULES.vintage.maxV
  ) {
    styles.push('vintage')
  }

  /* earth */
  if (
    h >= STYLE_RULES.earth.minH &&
    h < STYLE_RULES.earth.maxH &&
    s >= STYLE_RULES.earth.minS &&
    s < STYLE_RULES.earth.maxS &&
    v >= STYLE_RULES.earth.minV &&
    v < STYLE_RULES.earth.maxV
  ) {
    styles.push('earth')
  }

  /* warm */
  if (
    h < 70 ||
    h >= 300
  ) {
    styles.push('warm')
  }

  /* cool */
  else {
    styles.push('cool')
  }

  /* spring */
  if (
    styles.includes('warm') &&
    v >= STYLE_RULES.spring.minV &&
    s >= STYLE_RULES.spring.minS
  ) {
    styles.push('spring')
  }

  /* summer */
  if (
    styles.includes('cool') &&
    v >= STYLE_RULES.summer.minV &&
    s < STYLE_RULES.summer.maxS
  ) {
    styles.push('summer')
  }

  /* fall */
  if (
    styles.includes('warm') &&
    v < STYLE_RULES.fall.maxV &&
    s < STYLE_RULES.fall.maxS
  ) {
    styles.push('fall')
  }

  /* winter */
  if (
    styles.includes('cool') &&
    s >= STYLE_RULES.winter.minS &&
    v >= STYLE_RULES.winter.minV
  ) {
    styles.push('winter')
  }

  return styles
}

/* ===== 선택된 카테고리 ===== */
const selectedCategory = computed(
  () => colorStore.selectedCategory
)

/* ===== 최종 필터 ===== */
const filteredColors = computed(() => {

  return allColors.value.filter(color => {

    const category =
      getCategory(color.code)

    const styles =
      getStyles(color.code)

    const selected =
      selectedCategory.value

    const categoryMatch =
      category === selected

    const styleMatch =
      styles.includes(selected)

    if (
      !categoryMatch &&
      !styleMatch
    ) {
      return false
    }

    if (
      brightness.value === 'all'
    ) {
      return true
    }

    return (
      getTone(color.code)
      === brightness.value
    )
  })
})

/* ===== 이벤트 ===== */
const setBrightness = (
  type: 'all' | 'light' | 'dark'
) => {
  brightness.value = type
}
</script>

<style scoped>
/* ===== 전체 레이아웃 ===== */
.layout {
  display: flex;
}

/* ===== 메인 영역 ===== */
.category-page {
  margin-left: 260px;     /* 🔥 sidebar width */
  margin-top: 64px;       /* 🔥 navbar 고려 */

  width: 100%;
  min-height: calc(100vh - 64px);

  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ===== 헤더 ===== */
.category-header {
  margin-bottom: 40px;

  display: flex;
  align-items: center;
  gap: 20px;
}

/* 색상 배지 */
.category-badge {
  padding: 12px 28px;
  border: 2px solid #ddd;
  border-radius: 24px;

  font-size: 20px;
  font-weight: bold;
}

/* 필터 버튼 */
.filter-buttons {
  display: flex;
  gap: 10px;
}

.filter-buttons button {
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background: #e5e5e5;
  cursor: pointer;
}

.filter-buttons button.active {
  background: #333;
  color: #fff;
}

/* ===== 카드 그리드 ===== */
.color-grid {
  display: grid;
  grid-template-columns: repeat(5, 140px);
  gap: 24px;
  justify-content: start;
}
/* 태블릿 */
@media (max-width: 1200px) {
  .color-grid {
    grid-template-columns: repeat(4, 140px);
  }
}

/* 모바일 */
@media (max-width: 900px) {
  .color-grid {
    grid-template-columns: repeat(3, 140px);
  }
}

@media (max-width: 600px) {
  .color-grid {
    grid-template-columns: repeat(2, 140px);
  }
}

/* 카드 */
.color-card {
  width: 140px;
  background: #fff;

  border-radius: 12px;
  overflow: hidden;

  box-shadow: 4px 4px 8px rgba(0,0,0,0.2);

  display: flex;
  flex-direction: column;
  align-items: center;

  transition: 0.2s;
}

.color-card:hover {
  transform: translateY(-4px);
}

/* 색상 영역 */
.color-preview {
  width: 100%;
  height: 120px;
}

/* HEX */
.color-code {
  width: 100%;
  padding: 10px;

  text-align: center;
  font-weight: bold;
}
</style>