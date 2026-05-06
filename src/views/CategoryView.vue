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

const colorStore = useColorStore()

const brightness = ref<'all' | 'light' | 'dark'>('all')

/* ===== 샘플 전체 데이터 (테스트용) ===== */
const allColors = [
  { code: '#ff0000' }, { code: '#ff6666' }, { code: '#cc0000' },
  { code: '#00ff00' }, { code: '#66ff66' }, { code: '#009900' },
  { code: '#0000ff' }, { code: '#6666ff' }, { code: '#000099' },
  { code: '#00ffff' }, { code: '#66ffff' },
  { code: '#ff00ff' }, { code: '#ff66ff' },
]

/* ===== 카테고리 분류 ===== */
const getCategory = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

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
  if (hue < 255) return 'Blue'
  if (hue < 300) return 'Purple'
  if (hue < 330) return 'Pink'
  return 'Red'
}

/* ===== 밝기 ===== */
const getBrightness = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  const luminance = (0.299*r + 0.587*g + 0.114*b) / 255
  return luminance > 0.5 ? 'light' : 'dark'
}

/* ===== 선택된 카테고리 ===== */
const selectedCategory = computed(() => colorStore.selectedCategory)

/* ===== 최종 필터 ===== */
const filteredColors = computed(() => {
  return allColors.filter(c => {
    const categoryMatch = getCategory(c.code) === selectedCategory.value

    if (brightness.value === 'all') return categoryMatch

    const brightMatch = getBrightness(c.code) === brightness.value

    return categoryMatch && brightMatch
  })
})

/* ===== 이벤트 ===== */
const setBrightness = (type: 'all' | 'light' | 'dark') => {
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