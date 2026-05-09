# RandomPaletteView.vue

```vue
<template>
  <div
    class="palette-page"
    :style="{
      background: blendedGradient
    }"
  >

    <!-- 중앙 카드 -->
    <div class="palette-card">

      <h1 class="title">
        Random Palette
      </h1>

      <!-- 컬러칩 -->
      <div class="chip-row">

        <div
          v-for="color in palette"
          :key="color"
          class="chip-wrapper"
          @click="goDetail(color)"
        >

          <div
            class="palette-chip"
            :style="{
              backgroundColor: color
            }"
          >

            <div class="chip-overlay">
              {{ color }}
            </div>

          </div>

          <p class="chip-hex">
            {{ color }}
          </p>

        </div>

      </div>

      <!-- 버튼 -->
      <button
        class="generate-button"
        @click="generatePalette"
      >
        Generate Palette
      </button>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const palette = ref<string[]>([])

/* ===== 상세페이지 이동 ===== */
const goDetail = (color: string) => {

  router.push(
    `/color/${color.replace('#', '')}`
  )
}

/* ===== 중간 보간 ===== */
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

/* ===== gradient ===== */
const blendedGradient = computed(() => {

  if (palette.value.length === 0) {
    return '#f5f5f5'
  }

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

/* ===== 랜덤 palette ===== */
const generatePalette = async () => {

  const modes = [

    'monochrome',
    'monochrome-dark',
    'monochrome-light',

    'analogic',
    'complement',
    'analogic-complement',

    'triad',
    'quad',
  ]

  const randomMode =

    modes[
      Math.floor(
        Math.random() * modes.length
      )
    ]

  const baseHex =
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')

  try {

    const res = await fetch(

      `https://www.thecolorapi.com/scheme?hex=${baseHex}&mode=${randomMode}&count=5`
    )

    const data = await res.json()

    palette.value =
      data.colors.map(
        (c: any) => c.hex.value
      )
  }

  catch (err) {

    console.error(err)
  }
}

// onMounted(() => {
//   generatePalette()
// })
</script>

<style scoped>
.palette-page {

  position: fixed;
  inset: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  padding: 40px;
  box-sizing: border-box;

  margin: 0 auto;

  transition: 0.4s;
}

/* ===== 중앙 카드 ===== */
.palette-card {

  margin: 0 auto;

  width: min(900px, 100%);

  background:
    rgba(255,255,255,0.92);

  backdrop-filter:
    blur(12px);

  border-radius: 28px;

  padding: 50px;

  box-shadow:
    0 20px 50px rgba(0,0,0,0.18);

  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ===== title ===== */
.title {

  margin: 0 0 40px;

  font-size: 42px;
  font-weight: 800;

  color: #222;
}

/* ===== chips ===== */
.chip-row {

  width: 100%;

  display: grid;
  grid-template-columns: repeat(5, 1fr);

  gap: 20px;

  margin-bottom: 30px;
}

.chip-wrapper {
  width: 100%;
}

.palette-chip {

  position: relative;

  width: 100%;
  aspect-ratio: 1 / 1;

  overflow: hidden;

  cursor: pointer;

  transition: 0.22s;
}

.palette-chip:hover {

  transform:
    translateY(-6px);
}

/* ===== hover overlay ===== */
.chip-overlay {

  position: absolute;
  inset: 0;

  background:
    rgba(102,102,102,0.75);

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;

  font-size: 18px;
  font-weight: 700;

  opacity: 0;

  transition: 0.2s;
}

.chip-wrapper {

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.chip-hex {

  margin-top: 12px;

  font-size: 16px;
  font-weight: 700;

  color: #555;
}

.palette-chip:hover .chip-overlay {
  opacity: 1;
}

/* ===== hex list ===== */
.hex-list {

  width: 100%;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  gap: 14px;

  margin-bottom: 40px;
}

.hex-item {

  padding: 10px 18px;

  background: #f3f3f3;

  border:
    1px solid #e5e5e5;

  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.hex-item:hover {

  background: #e9e9e9;

  transform:
    translateY(-2px);
}

/* ===== button ===== */
.generate-button {

  width: 260px;
  height: 56px;

  border: none;

  background: #222;
  color: white;

  font-size: 17px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.22s;
}

.generate-button:hover {

  background: #111;

  transform:
    translateY(-2px);
}

.generate-button:active {

  transform:
    scale(0.97);
}
</style>
```
