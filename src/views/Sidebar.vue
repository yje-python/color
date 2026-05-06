<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <ul class="color-list">
      <li
        v-for="item in colors"
        :key="item.name"
        class="color-item"
        :class="{ active: colorStore.selectedCategory === item.name }"
        @click="selectColor(item.name)"
      >
          <span
            class="color-dot"
            :style="{ backgroundColor: item.color }"
          />
          <span class="color-label">{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useColorStore } from '@/stores/color'

const colorStore = useColorStore()

const colors = [
  { name: 'Red', color: 'red' },
  { name: 'Orange', color: '#ff8000' },
  { name: 'Yellow', color: 'yellow' },
  { name: 'Lime', color: '#80ff00' },
  { name: 'Green', color: '#0f0' },
  { name: 'Teal', color: '#0ff' },
  { name: 'Blue', color: '#086df0' },
  { name: 'Navy', color: '#0000ff' },
  { name: 'Indigo', color: '#8000ff' },
  { name: 'Pink', color: '#f0f' },
  { name: 'Black', color: '#000' },
  { name: 'White', color: '#f5f5f5' },
]

const selectColor = (name: string) => {
  colorStore.setCategory(name)
}
</script>

<style scoped>
/* ===== 사이드바 ===== */
.sidebar {
  position: fixed;
  top: 64px; /* navbar 높이에 맞게 조정 */
  left: 0;

  width: 260px;
  height: calc(100vh - 64px);

  background: #ffffff;
  border-radius: 0 20px 20px 0;

  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.08);

  z-index: 10;
}

/* 내부 스크롤 */
.sidebar-content {
  height: 100%;
  overflow-y: auto;
  padding: 12px 8px;
}

/* 리스트 */
.color-list {
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* 아이템 */
.color-item {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 14px;
  border-radius: 14px;

  cursor: pointer;
  transition: 0.2s;
}

/* hover */
.color-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* 🔥 active */
.color-item.active {
  background: rgba(0, 0, 0, 0.08);
  font-weight: 600;
}

/* 컬러 점 */
.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* 텍스트 */
.color-label {
  font-size: 14px;
  color: #131313;
}
</style>