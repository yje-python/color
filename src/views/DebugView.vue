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

        <!-- ===== 필터 버튼 ===== -->
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

          <button
            :class="{ active: brightness === 'vivid' }"
            @click="setBrightness('vivid')"
          >
            Vivid
          </button>

          <button
            :class="{ active: brightness === 'muted' }"
            @click="setBrightness('muted')"
          >
            Muted
          </button>

        </div>

      </div>

      <!-- 색상 카드 -->
      <div class="color-grid">
        <div
          v-for="color in pagedColors"
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

      <div class="pagination">

        <!-- 첫 페이지 -->
        <button
          @click="goPage(1)"
          :disabled="currentPage === 1"
        >
          &lt;&lt;
        </button>

        <!-- 이전 -->
        <button
          @click="goPage(currentPage - 1)"
          :disabled="currentPage === 1"
        >
          &lt;
        </button>

        <!-- 페이지 번호 -->
        <button
          v-for="page in visiblePages"
          :key="page"

          :class="{
            active: currentPage === page
          }"

          @click="goPage(page)"
        >
          {{ page }}
        </button>

        <!-- 다음 -->
        <button
          @click="goPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          &gt;
        </button>

        <!-- 마지막 -->
        <button
          @click="goPage(totalPages)"
          :disabled="currentPage === totalPages"
        >
          &gt;&gt;
        </button>

      </div>

    </main>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Sidebar from '@/views/Sidebar.vue'
import { useColorStore } from '@/stores/color'

import { BASE_COLOR_RANGES } from '@/constants/baseColors'
import { ACHROMATIC_RULES } from '@/constants/colorRules'
import { STYLE_RULES } from '@/constants/styleRules'

const colorStore = useColorStore()

/* ===== 필터 ===== */
const brightness = ref<
  'all' |
  'light' |
  'dark' |
  'vivid' |
  'muted'
>('all')

/* ===== 페이지네이션 ===== */
const currentPage = ref(1)

const ITEMS_PER_PAGE = 20

/* ===== 전체 색상 자동 생성 ===== */
const allColors = computed(() => {

  const colors: {
    code: string
    category: string
    tone: string
    styles: string[]
    saturationType: string
  }[] = []

  const values = []

  for (let i = 0; i <= 255; i += 4) {
    values.push(i)
  }

  if (values[values.length - 1] !== 255) {
    values.push(255)
  }

  for (const r of values) {

    for (const g of values) {

      for (const b of values) {

        const hex =
          `#${r.toString(16).padStart(2, '0')}` +
          `${g.toString(16).padStart(2, '0')}` +
          `${b.toString(16).padStart(2, '0')}`

        const hsv = hexToHSV(hex)

        colors.push({
          code: hex,

          category: getCategory(hex),

          tone: getTone(hex),

          styles: getStyles(hex),

          saturationType:
            hsv.s >= 50
              ? 'vivid'
              : 'muted',
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

  const s =
    max === 0
      ? 0
      : (delta / max) * 100

  const v = max * 100

  return { h, s, v }
}

/* ===== 무채색 ===== */
/* ===== 무채색 ===== */
const getAchromaticCategory = (
  h: number,
  s: number,
  v: number,
) => {

  /* ===== black ===== */
  if (
    v <= ACHROMATIC_RULES.black.maxV!
  ) {
    return 'black'
  }

  /* ===== white ===== */
  if (
    v >= ACHROMATIC_RULES.white.minV! &&
    s <= ACHROMATIC_RULES.white.maxS!
  ) {
    return 'white'
  }

  /* ===== gray ===== */
  const gray =
    ACHROMATIC_RULES.gray

  const grayHueMatch =
    gray.hueRanges!.some(
      ([min, max]) =>
        h >= min && h < max
    )

  if (
    v >= gray.minV! &&
    v <= gray.maxV! &&
    s <= gray.maxS! &&
    !grayHueMatch
  ) {
    return 'gray'
  }

  return null
}

/* ===== 유채색 ===== */
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

/* ===== category ===== */
const getCategory = (hex: string) => {

  const { h, s, v } = hexToHSV(hex)

  const achromatic =
    getAchromaticCategory(h, s, v)

  if (achromatic) {
    return achromatic
  }

  return getChromaticCategory(h)
}

/* ===== tone ===== */
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

/* ===== styles ===== */
/* ===== styles ===== */
const getStyles = (hex: string) => {

  const { h, s, v } = hexToHSV(hex)

  const styles: string[] = []

  const isGray =
    s <= ACHROMATIC_RULES.gray.maxS

  const isWarm =
    h < 70 || h >= 300

  const isCool =
    h >= 70 && h < 300

  /* ===== vivid ===== */
  if (
    s >= STYLE_RULES.vivid.minS! &&
    v >= STYLE_RULES.vivid.minV!
  ) {
    styles.push('vivid')
  }

  /* ===== muted ===== */
  if (
    s >= STYLE_RULES.muted.minS! &&
    s < STYLE_RULES.muted.maxS!
  ) {
    styles.push('muted')
  }

  /* ===== pastel ===== */
  if (
    v >= STYLE_RULES.pastel.minV! &&
    s < STYLE_RULES.pastel.maxS!
  ) {
    styles.push('pastel')
  }

  /* ===== neon ===== */
  if (
    v >= STYLE_RULES.neon.minV! &&
    s >= STYLE_RULES.neon.minS!
  ) {
    styles.push('neon')
  }

  /* ===== vintage ===== */
  if (
    s < STYLE_RULES.vintage.maxS! &&
    v >= STYLE_RULES.vintage.minV! &&
    v < STYLE_RULES.vintage.maxV!
  ) {
    styles.push('vintage')
  }

  /* ===== earth ===== */
  if (
    h >= STYLE_RULES.earth.minH! &&
    h < STYLE_RULES.earth.maxH! &&
    s >= STYLE_RULES.earth.minS! &&
    s < STYLE_RULES.earth.maxS! &&
    v >= STYLE_RULES.earth.minV! &&
    v < STYLE_RULES.earth.maxV!
  ) {
    styles.push('earth')
  }

  /* ===== warm ===== */
  if (isWarm) {
    styles.push('warm')
  }

  /* ===== cool ===== */
  if (isCool) {
    styles.push('cool')
  }

  /* ===== spring ===== */
  const spring = STYLE_RULES.spring

  if (
    spring.hueRanges!.some(
      ([min, max]) => h >= min && h < max
    ) &&
    v >= spring.minV! &&
    s >= spring.minS! &&
    (!spring.preferWarm || isWarm)
  ) {
    styles.push('spring')
  }

  /* ===== summer ===== */
  const summer = STYLE_RULES.summer

  const summerHueMatch =
    summer.hueRanges!.some(
      ([min, max]) => h >= min && h < max
    )

  if (
    (
      summerHueMatch ||
      (summer.allowGrays && isGray)
    ) &&
    v >= summer.minV! &&
    s < summer.maxS!
  ) {
    styles.push('summer')
  }

  /* ===== fall ===== */
  const fall = STYLE_RULES.fall

  if (
    fall.hueRanges!.some(
      ([min, max]) => h >= min && h < max
    ) &&
    v >= fall.minV! &&
    v < fall.maxV! &&
    s >= fall.minS!
  ) {
    styles.push('fall')
  }

  /* ===== winter ===== */
  const winter = STYLE_RULES.winter

  const winterHueMatch =
    winter.hueRanges!.some(
      ([min, max]) => h >= min && h < max
    )

  if (
    winterHueMatch &&
    winter.customFilter!?.(h, s, v)
  ) {
    styles.push('winter')
  }

  /* ===== metallic ===== */

  /* gold */
  const gold =
    STYLE_RULES.metallic.gold

  if (
    h >= gold.minH &&
    h < gold.maxH &&
    s >= gold.minS &&
    s < gold.maxS &&
    v >= gold.minV &&
    v < gold.maxV
  ) {
    styles.push('gold')
  }


/* silver */
const silver =
  STYLE_RULES.metallic.silver

const silverHueMatch =
  silver.hueRanges!.some(
    ([min, max]: [number, number]) =>
      h >= min && h < max
  )

if (

  /* 매우 낮은 채도 */
  s <= silver.maxS &&

  /* 실버 명도 범위 */
  v >= silver.minV &&
  v <= silver.maxV &&

  /* 완전 무채색 허용 */
  (
    s === 0 ||

    /* 아주 미세한 색감은
       blue/purple 계열만 허용 */
    silverHueMatch
  )

) {
  styles.push('silver')
}

  /* bronze */
  const bronze =
    STYLE_RULES.metallic.bronze

  if (
    h >= bronze.minH &&
    h < bronze.maxH &&
    s >= bronze.minS &&
    s < bronze.maxS &&
    v >= bronze.minV &&
    v < bronze.maxV
  ) {
    styles.push('bronze')
  }

  return styles
}

/* ===== 선택된 category ===== */
const selectedCategory = computed(
  () => colorStore.selectedCategory
)

/* ===== 필터 ===== */
const filteredColors = computed(() => {

  return allColors.value.filter(color => {

    const categoryMatch =
      color.category === selectedCategory.value

    const styleMatch =
      color.styles.includes(
        selectedCategory.value
      )

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

    if (
      brightness.value === 'light' ||
      brightness.value === 'dark'
    ) {
      return (
        color.tone === brightness.value
      )
    }

    return (
      color.saturationType
      === brightness.value
    )
  })
})

/* ===== 총 페이지 ===== */
const totalPages = computed(() => {

  return Math.ceil(
    filteredColors.value.length /
    ITEMS_PER_PAGE
  )
})

/* ===== 현재 페이지 데이터 ===== */
const pagedColors = computed(() => {

  const start =
    (currentPage.value - 1)
    * ITEMS_PER_PAGE

  const end =
    start + ITEMS_PER_PAGE

  return filteredColors.value.slice(
    start,
    end,
  )
})

/* ===== category 변경 시 1페이지 ===== */
watch(
  () => [
    selectedCategory.value,
    brightness.value,
  ],

  () => {
    currentPage.value = 1
  }
)

/* ===== 페이지 이동 ===== */
const goPage = (page: number) => {

  if (
    page < 1 ||
    page > totalPages.value
  ) {
    return
  }

  currentPage.value = page

  window.scrollTo(0, 0)
}

/* ===== 현재 보이는 페이지 번호 ===== */
const visiblePages = computed(() => {

  const groupSize = 5

  const start =
    Math.floor(
      (currentPage.value - 1)
      / groupSize
    ) * groupSize + 1

  const end = Math.min(
    start + groupSize - 1,
    totalPages.value,
  )

  return Array.from(
    { length: end - start + 1 },

    (_, i) => start + i
  )
})

/* ===== 필터 ===== */
const setBrightness = (
  type:
    | 'all'
    | 'light'
    | 'dark'
    | 'vivid'
    | 'muted'
) => {

  brightness.value = type
}
</script>

<style scoped>

/* ===== 전체 ===== */
.layout {
  display: flex;
}

/* ===== 메인 ===== */
.category-page {
  margin-left: 260px;

  width: 100%;
  min-height: 100vh;

  padding: 180px 60px 60px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ===== 상단 고정 ===== */
.category-header {
  position: fixed;

  top: 50px;
  left: 260px;
  right: 0;

  z-index: 20;

  height: 90px;

  background: white;

  display: flex;
  align-items: center;
  gap: 20px;

  padding: 0 40px;

  border-bottom: 1px solid #eee;
}

/* ===== badge ===== */
.category-badge {
  padding: 12px 28px;

  border: 2px solid #ddd;
  border-radius: 24px;

  font-size: 20px;
  font-weight: bold;

  text-transform: capitalize;
}

/* ===== 버튼 ===== */
.filter-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-buttons button {
  padding: 8px 16px;

  border-radius: 20px;
  border: none;

  background: #e5e5e5;

  cursor: pointer;

  transition: 0.2s;
}

.filter-buttons button.active {
  background: #333;
  color: white;
}

/* ===== grid ===== */
.color-grid {
  display: grid;

  grid-template-columns: repeat(5, 160px);

  gap: 40px;

  justify-content: center;
}

/* ===== 카드 ===== */
.color-card {
  width: 160px;

  background: white;

  border-radius: 16px;

  overflow: hidden;

  box-shadow:
    0 4px 12px rgba(0,0,0,0.12);

  transition: 0.2s;
}

.color-card:hover {
  transform: translateY(-6px);
}

/* ===== 미리보기 ===== */
.color-preview {
  width: 100%;
  height: 140px;
}

/* ===== hex ===== */
.color-code {
  padding: 14px;

  text-align: center;

  font-weight: 700;
}

/* ===== pagination ===== */
.pagination {
  margin-top: 70px;

  display: flex;
  align-items: center;
  gap: 10px;

  flex-wrap: wrap;
}

.pagination button {

  min-width: 42px;
  height: 42px;

  padding: 0 12px;

  border: none;
  border-radius: 12px;

  background: #eee;

  cursor: pointer;

  transition: 0.2s;
}

.pagination button:hover:not(:disabled) {
  background: #d8d8d8;
}

.pagination button.active {
  background: #222;
  color: white;
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: default;
}

</style>