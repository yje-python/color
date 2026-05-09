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
              :style="{
                backgroundColor: color
              }"
              @click="
                router.push(
                  `/color/${color.replace('#', '')}`
                )
              "
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
            :style="{
              background: isDark
                ? '#121212'
                : '#ffffff',

              border: isDark
                ? '1px solid rgba(255,255,255,0.08)'
                : `1px solid ${hexToRgba(mainColor, 0.15)}`,

              boxShadow: isDark
                ? '0 10px 30px rgba(0,0,0,0.45)'
                : `0 10px 30px ${hexToRgba(mainColor, 0.12)}`
            }"
          >
            <h2
              class="example-title"
              :style="{
                color: isDark
                  ? '#d4d4d4'
                  : '#555555',
                borderColor: mainColor
              }"
            >
              Title
            </h2>

            <div class="buttons">

              <button
                class="btn primary"
                :style="{
                  background: mainColor,
                  color: '#fff'
                }"
              >
                Primary
              </button>

              <button
                class="btn secondary"
                :style="{
                  background: secondaryColor,
                  color: '#fff'
                }"
              >
                Secondary
              </button>

              <button
                class="btn outline"
                :style="{
                  borderColor: mainColor,
                  color: mainColor
                }"
              >
                Outline
              </button>

              <button
                class="btn accent"
                :style="{
                  background: accentColor,
                  color: '#fff'
                }"
              >
                Accent
              </button>

            </div>

            <p
              :style="{
                color: isDark
                  ? '#f5f5f5'
                  : '#444'
              }"
            >
              This is an example of the color palette.
            </p>
          </div>

        </div>

        <!-- ===== Blended ===== -->
        <div class="blended-section">

          <h3 class="blended-title">
            Blended
          </h3>

          <div
            class="blended-box"
            :style="{
              background: blendedGradient
            }"
          ></div>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const isDark = ref(false)

/* ===== palette ===== */
const palette = computed(() => {

  const raw =
    route.query.colors as string

  if (!raw) {
    return [
      '#398d6c',
      '#409f7a',
      '#57bb94',
      '#69c2a0',
      '#7ed0b0',
    ]
  }

  return raw.split(',')
})

/* ===== 핵심 색 ===== */
const mainColor = computed(() => {
  return palette.value[2]
})

const secondaryColor = computed(() => {
  return palette.value[1]
})

const accentColor = computed(() => {
  return palette.value[3]
})

const darkBg = computed(() => {
  return palette.value[0]
})

const lightBg = computed(() => {
  return palette.value[4]
})



/* ===== hex -> rgba ===== */
const hexToRgba = (
  hex: string,
  alpha: number
) => {

  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const mixColors = (
  color1: string,
  color2: string
) => {

  const r1 =
    parseInt(color1.slice(1, 3), 16)

  const g1 =
    parseInt(color1.slice(3, 5), 16)

  const b1 =
    parseInt(color1.slice(5, 7), 16)

  const r2 =
    parseInt(color2.slice(1, 3), 16)

  const g2 =
    parseInt(color2.slice(3, 5), 16)

  const b2 =
    parseInt(color2.slice(5, 7), 16)

  const r =
    Math.round((r1 + r2) / 2)

  const g =
    Math.round((g1 + g2) / 2)

  const b =
    Math.round((b1 + b2) / 2)

  return (
    `#${r.toString(16).padStart(2, '0')}` +
    `${g.toString(16).padStart(2, '0')}` +
    `${b.toString(16).padStart(2, '0')}`
  )
}

const blendedGradient = computed(() => {

  const expanded: string[] = []

  for (
    let i = 0;
    i < palette.value.length - 1;
    i++
  ) {

    const current =
      palette.value[i]

    const next =
      palette.value[i + 1]

    expanded.push(current)

    /* ===== 중간 보간색 ===== */
    expanded.push(
      mixColors(current, next)
    )
  }

  expanded.push(
    palette.value[
      palette.value.length - 1
    ]
  )

  const total =
    expanded.length - 1

  const stops =
    expanded.map((color, index) => {

      const percent =
        Math.round(
          (index / total) * 100
        )

      return `${color} ${percent}%`
    })

  return `
    linear-gradient(
      135deg,
      ${stops.join(',')}
    )
  `
})
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
  cursor: pointer;
  border-radius: 24px;

  box-shadow:
    0 10px 20px rgba(0,0,0,0.12);

  transition: 0.25s;
}

.palette-chip:hover {
  transform:
    translateY(-6px)
    scale(1.03);
}

.palette-chip:active {
  transform:
    scale(0.97);
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

.example-title {

  display: inline-block;

  padding-bottom: 6px;

  border-bottom: 4px solid;

  margin-bottom: 20px;
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
  padding: 10px 18px;

  border-radius: 20px;

  border: none;

  cursor: pointer;

  transition: 0.2s;

  font-weight: 600;
}
.btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
}
.btn:active {
  transform: scale(0.97);
}

.btn.outline {
  background: transparent;
  border: 2px solid;
}

/* ===== blended ===== */
.blended-section {
  margin-top: 40px;
}

.blended-title {
  margin-bottom: 14px;

  font-size: 22px;
  font-weight: 700;

  color: #333;
}

.blended-box {

  width: 100%;
  height: 180px;

  border-radius: 24px;

  box-shadow:
    0 12px 28px rgba(0,0,0,0.12);

  border:
    1px solid rgba(255,255,255,0.18);
}
</style>