<template>
  <div class="slot-page">

    <div class="slot-container">

      <!-- 슬롯 -->
      <div class="slot-row">
        <div v-for="i in 6" :key="i" class="slot-card">

          <div
            class="slot-inner"
            :style="{ transform: `translateY(-${positions[i-1]}px)` }"
          >
            <div
              v-for="(c, idx) in HEX_LIST"
              :key="idx"
              class="slot-item"
            >
              {{ c }}
            </div>
          </div>

        </div>
      </div>

      <!-- 🔥 버튼 -->
      <button class="retry-btn" @click="spin">
        돌리기
      </button>

      <!-- 🔥 결과 영역 (항상 존재) -->
      <div class="result-card">

        <!-- 🔥 왼쪽: 색상칩 -->
        <div class="result-left">
          <div
            v-if="!resultHex"
            class="result-chip empty"
          >
            <svg viewBox="0 0 100 100" class="question-icon">
              <text x="50" y="55" text-anchor="middle">?</text>
            </svg>
          </div>

          <div
            v-else
            class="result-chip"
            :style="{ background: resultHex }"
          ></div>
        </div>

        <!-- 🔥 오른쪽: 텍스트 -->
        <div class="result-right">

          <h2 v-if="resultHex" :style="{ color: resultHex }">
            {{ colorName }}
          </h2>

          <h2 v-else class="placeholder">
            Color
          </h2>

          <button class="detail-btn">
            상세 정보
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// const hexChars = ref(['-','-','-','-','-','-'])
const resultHex = ref('')
const colorName = ref('')

const HEX_LIST = '0123456789ABCDEF'.split('')
const positions = ref(new Array(6).fill(0))

const ITEM_HEIGHT = 106
// const slots = ref(new Array(6).fill(null))
const spin = () => {
  for (let i = 0; i < 6; i++) {
    animateSlot(i)
  }
}

const animateSlot = (index: number) => {
  let offset = 0
  let speed = 40

  const interval = setInterval(() => {
    offset += speed

    positions.value[index] = offset

    // 🔥 감속
    if (offset > ITEM_HEIGHT * 20) {
      clearInterval(interval)

      const finalIndex = Math.floor(Math.random() * 16)

      positions.value[index] =
        finalIndex * ITEM_HEIGHT

      updateResult()
    }

  }, 30)
}

const updateResult = () => {
  const result = positions.value.map(pos => {
    const idx = Math.round(pos / ITEM_HEIGHT) % 16
    return HEX_LIST[idx]
  })

  const hex = '#' + result.join('')
  resultHex.value = hex
  colorName.value = getColorName(hex)
}

/* 간단 색 이름 */
const getColorName = (hex: string) => {
  const r = parseInt(hex.slice(1,3),16)
  const g = parseInt(hex.slice(3,5),16)
  const b = parseInt(hex.slice(5,7),16)

  if (r > g && r > b) return 'Red'
  if (g > r && g > b) return 'Green'
  if (b > r && b > g) return 'Blue'
  if (r > 200 && g > 200) return 'Yellow'
  if (g > 200 && b > 200) return 'Cyan'
  if (r > 200 && b > 200) return 'Magenta'

  return 'Color'
}


</script>

<style scoped>
.slot-page {
  min-height: 100vh;
  background: #333333;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
}

.slot-container {
  width: 900px;
  text-align: center;
}

/* 슬롯 */
.slot-row {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 30px;
}

/* 슬롯 카드 */
.slot-card {
  width: 80px;
  height: 106px;
  overflow: hidden;   /* 🔥 핵심 */

  background: #fff;
  border-radius: 16px;
}

/* 내부 스크롤 영역 */
.slot-inner {
  transition: transform 0.2s ease-out;
}

/* 각 글자 */
.slot-item {
  height: 106px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 42px;
  font-weight: bold;
}
.slot-card.animate {
  transform: translateY(-10px);
}

/* 버튼 */
.retry-btn {
  margin-left: auto;
  display: block;

  background: #fff;
  border: none;
  padding: 8px 18px;

  border-radius: 20px;
  cursor: pointer;

  margin-bottom: 30px;
}

/* 결과 */
.result-card {
  background: #fff;
  border-radius: 20px;

  padding: 30px;

  display: flex;
  align-items: center;
  gap: 60px;

  justify-content: center;
}

/* 🔥 칩 영역 고정 */
.result-left {
  width: 200px;
  display: flex;
  justify-content: center;
}

/* 🔥 텍스트 영역 고정 */
.result-right {
  width: 300px;           /* 🔥 고정 */
  display: flex;
  flex-direction: column;
  align-items: center;    /* 🔥 가운데 정렬 */
  justify-content: center;
  text-align: center;
}

/* 칩 */
.result-chip {
  width: 180px;
  height: 180px;
}

.result-chip.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
}

/* ? 아이콘 */
.question-icon {
  width: 60px;
  height: 60px;

  font-size: 60px;
  fill: #999;

  overflow: visible; /* 🔥 핵심 */
}

/* 텍스트 */
.result-right h2 {
  margin: 0;
  font-size: 36px;
}

.placeholder {
  color: #aaa;
}

/* 버튼 */
.detail-btn {
  margin-top: 10px;

  padding: 8px 16px;
  border-radius: 20px;
  border: none;

  cursor: pointer;
}
</style>