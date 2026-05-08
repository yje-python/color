<template>
  <aside class="sidebar">

    <div class="sidebar-content">

      <!-- ===== COLOR SECTION ===== -->
      <div class="section">

        <div
          class="section-title"
          @click="toggleColorSection"
        >
          <span>Color</span>
          <span>{{ showColors ? '−' : '+' }}</span>
        </div>

        <transition name="fade">
          <ul
            v-if="showColors"
            class="color-list"
          >
            <li
              v-for="item in colors"
              :key="item.name"
              class="color-item"
              :class="{ active: colorStore.selectedCategory === item.name }"
              @click="selectCategory(item.name)"
            >
              <span
                class="color-dot"
                :style="{ backgroundColor: item.color }"
              />

              <span class="color-label">
                {{ item.name }}
              </span>
            </li>
          </ul>
        </transition>

      </div>

      <!-- ===== STYLE SECTION ===== -->
      <div class="section">

        <div
          class="section-title"
          @click="toggleStyleSection"
        >
          <span>Style</span>
          <span>{{ showStyles ? '−' : '+' }}</span>
        </div>

        <transition name="fade">
          <ul
            v-if="showStyles"
            class="color-list"
          >

            <li
              v-for="style in styles"
              :key="style"
              class="color-item"
              :class="{ active: colorStore.selectedCategory === style }"
              @click="selectCategory(style)"
            >
              <span class="style-dot" />

              <span class="color-label">
                {{ style }}
              </span>
            </li>

          </ul>
        </transition>

      </div>

      <!-- ===== SEASON SECTION ===== -->
      <div class="section">

        <div
          class="section-title"
          @click="toggleSeasonSection"
        >
          <span>Season</span>
          <span>{{ showSeasons ? '−' : '+' }}</span>
        </div>

        <transition name="fade">
          <ul
            v-if="showSeasons"
            class="color-list"
          >

            <li
              v-for="season in seasons"
              :key="season"
              class="color-item"
              :class="{ active: colorStore.selectedCategory === season }"
              @click="selectCategory(season)"
            >
              <span class="style-dot" />

              <span class="color-label">
                {{ season }}
              </span>
            </li>

          </ul>
        </transition>

      </div>

    </div>

  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useColorStore } from '@/stores/color'

const colorStore = useColorStore()

/* ===== 펼침 상태 ===== */
const showColors = ref(true)
const showStyles = ref(true)
const showSeasons = ref(true)

/* ===== Base Colors ===== */
const colors = [
  { name: 'red', color: 'red' },
  { name: 'orange', color: '#ff8000' },
  { name: 'yellow', color: 'yellow' },
  { name: 'lime', color: '#80ff00' },
  { name: 'green', color: '#0f0' },
  { name: 'teal', color: '#0ff' },
  { name: 'blue', color: '#086df0' },
  { name: 'navy', color: '#0000ff' },
  { name: 'purple', color: '#8000ff' },
  { name: 'pink', color: '#f0f' },
  { name: 'black', color: '#000' },
  { name: 'white', color: '#f5f5f5' },
  { name: 'gray', color: '#888' },
]

/* ===== Style ===== */
const styles = [
  'vivid',
  'muted',
  'pastel',
  'neon',

  'vintage',
  'earth',

  'warm',
  'cool',

  'metallic',
]

/* ===== Season ===== */
const seasons = [
  'spring',
  'summer',
  'fall',
  'winter',
]

/* ===== 선택 ===== */
const selectCategory = (name: string) => {

  colorStore.setCategory(name)

  window.scrollTo(0, 0)
}

/* ===== 토글 ===== */
const toggleColorSection = () => {
  showColors.value = !showColors.value
}

const toggleStyleSection = () => {
  showStyles.value = !showStyles.value
}

const toggleSeasonSection = () => {
  showSeasons.value = !showSeasons.value
}
</script>

<style scoped>

/* ===== 사이드바 ===== */
.sidebar {
  position: fixed;
  top: 64px;
  left: 0;

  width: 260px;
  height: calc(100vh - 64px);

  background: #ffffff;

  border-radius: 0 20px 20px 0;

  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.08);

  z-index: 10;
}

/* ===== 내부 ===== */
.sidebar-content {
  height: 100%;
  overflow-y: auto;
  padding: 12px 8px 30px;
}

/* ===== 섹션 ===== */
.section {
  margin-bottom: 20px;
}

/* ===== 제목 ===== */
.section-title {
  padding: 12px 14px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 15px;
  font-weight: 700;

  cursor: pointer;

  border-radius: 12px;

  transition: 0.2s;
}

.section-title:hover {
  background: rgba(0,0,0,0.05);
}

/* ===== 리스트 ===== */
.color-list {
  list-style: none;

  margin: 6px 0 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* ===== 아이템 ===== */
.color-item {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 14px;

  border-radius: 14px;

  cursor: pointer;

  transition: 0.2s;
}

.color-item:hover {
  background: rgba(0,0,0,0.05);
}

/* ===== active ===== */
.color-item.active {
  background: rgba(0,0,0,0.08);
  font-weight: 600;
}

/* ===== 컬러 점 ===== */
.color-dot {
  width: 12px;
  height: 12px;

  border-radius: 50%;

  flex-shrink: 0;

  border: 1px solid rgba(0,0,0,0.1);
}

/* ===== 스타일 점 ===== */
.style-dot {
  width: 12px;
  height: 12px;

  border-radius: 50%;

  background: #777;

  flex-shrink: 0;
}

/* ===== 텍스트 ===== */
.color-label {
  font-size: 14px;
  color: #131313;
}

/* ===== 애니메이션 ===== */
.fade-enter-active,
.fade-leave-active {
  transition: 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>