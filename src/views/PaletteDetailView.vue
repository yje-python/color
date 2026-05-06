<template>
  <div class="palette-page">

    <!-- 배경 -->
    <div class="hero-bg">
      <div
        v-for="color in palette"
        :key="color"
        class="bg-segment"
        :style="{ backgroundColor: color }"
      ></div>
    </div>

    <!-- 컨테이너 -->
    <div class="detail-container">
      <div class="content">

        <!-- 컬러칩 -->
        <div class="palette-row">
          <div
            v-for="color in palette"
            :key="color"
            class="palette-item"
          >
            <div
              class="palette-chip"
              :style="{ backgroundColor: color }"
            ></div>
            <p class="palette-code">{{ color }}</p>
          </div>
        </div>

        <!-- 🔥 UI 예시 영역 -->
        <div class="example-section">

          <!-- 🔥 토글 배지 -->
          <div class="mode-toggle">

            <!-- ☀ Sun -->
            <div
              class="toggle-btn"
              :class="{ active: !isDark }"
              @click="isDark = false"
            >
              <svg viewBox="0 0 24 24" class="icon">
                <circle cx="12" cy="12" r="5" />
                <g stroke-width="2">
                  <line x1="12" y1="1" x2="12" y2="4"/>
                  <line x1="12" y1="20" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
                  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="4" y2="12"/>
                  <line x1="20" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
                  <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
                </g>
              </svg>
            </div>

            <!-- 🌙 Moon -->
            <div
              class="toggle-btn"
              :class="{ active: isDark }"
              @click="isDark = true"
            >
              <svg viewBox="0 0 24 24" class="icon">
                <path d="M21 12.8A9 9 0 1 1 11.2 3
                  7 7 0 0 0 21 12.8z" />
              </svg>
            </div>

          </div>

          <!-- 🔥 UI 카드 -->
          <div
            class="example"
            :class="{ dark: isDark, light: !isDark }"
          >
            <h2 :style="{ color: isDark ? palette[4] : palette[0] }">
              Title
            </h2>

            <div class="buttons">
              <button
                class="btn primary"
                :style="{ background: palette[2], color: '#fff' }"
              >
                Primary
              </button>

              <button
                class="btn outline"
                :style="{
                  borderColor: palette[2],
                  color: palette[2]
                }"
              >
                Outline
              </button>

              <button
                class="btn hover"
                :style="{ background: palette[1], color: '#fff' }"
              >
                Hover
              </button>
            </div>

            <p :style="{ color: isDark ? palette[4] : palette[0] }">
              This is an example of the color palette.
            </p>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/* 모드 상태 */
const isDark = ref(false)

/* 기준 색 */
const base = '#57bb94'

/* 밝기 조절 */
const adjust = (hex: string, amount: number) => {
  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)

  r = Math.min(255, Math.max(0, r + amount))
  g = Math.min(255, Math.max(0, g + amount))
  b = Math.min(255, Math.max(0, b + amount))

  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
}

/* 팔레트 */
const palette = [
  adjust(base, -60),
  adjust(base, -30),
  base,
  adjust(base, 30),
  adjust(base, 60),
]
</script>

<style scoped>
.palette-page {
  width: 100%;
}

/* ===== 배경 ===== */
.hero-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 20vh;
  display: flex;
  opacity: 0.75;
  z-index: 0;
}

.bg-segment {
  flex: 1;
}

/* ===== 컨테이너 ===== */
.detail-container {
  position: fixed;
  top: 15vh;
  left: 0;
  width: 100%;
  height: 80vh;
  background: #fff;
  border-radius: 30px 30px 0 0;
  display: flex;
  justify-content: center;
  z-index: 1;
}

.content {
  width: 100%;
  max-width: 1000px;
  padding: 40px;
  overflow-y: auto;
}

/* ===== 컬러칩 ===== */
.palette-row {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 40px;
}

.palette-item {
  text-align: center;
}

.palette-chip {
  width: 160px;
  height: 160px;
}

.palette-code {
  margin-top: 10px;
  font-weight: bold;
}

/* ===== 토글 ===== */
.mode-toggle {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.toggle-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e0e0;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  font-size: 18px;
}

.toggle-btn.active {
  background: #333;
  color: #fff;
}

/* 아이콘 */
.icon {
  width: 18px;
  height: 18px;

  fill: none;
  stroke: #555;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* active 상태 */
.toggle-btn.active .icon {
  stroke: #fff;
}

/* ===== 예시 ===== */
.example {
  padding: 30px;
  border-radius: 12px;
}

/* 다크모드 */
.example.dark {
  background: #121212;
}

/* 라이트모드 */
.example.light {
  background: #f5f5f5;
}

/* 버튼 */
.buttons {
  display: flex;
  gap: 12px;
  margin: 15px 0;
}

.btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
}

.btn.outline {
  background: transparent;
  border: 2px solid;
}
</style>