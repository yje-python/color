<template>
  <div class="layout">

    <Sidebar />

    <main class="category-page">

      <div class="category-header">

        <div class="category-badge">
          {{ selectedCategory }}
        </div>

        <div class="style-list">

          <button
            v-for="style in ['light', 'dark', 'vivid', 'mute']"
            :key="style"

            class="style-button"

            :class="{
              active: selectedStyles.includes(style)
            }"

            @click="toggleStyle(style)"
          >
            {{ style }}
          </button>

        </div>

      </div>

      <div class="color-grid">

        <div
          v-for="color in pagedColors"
          :key="color.hex"

          class="color-card"

          @click="
            router.push(
              `/color/${
                color.hex.replace('#', '')
              }`
            )
          "
        >

          <div
            class="color-preview"

            :style="{
              backgroundColor: color.hex
            }"
          />

          <p class="color-code">
            {{ color.hex }}
          </p>

        </div>

      </div>

      <div class="pagination">

        <button
          @click="goPage(1)"
          :disabled="currentPage === 1"
        >
          &lt;&lt;
        </button>

        <button
          @click="goPage(currentPage - 1)"
          :disabled="currentPage === 1"
        >
          &lt;
        </button>

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

        <button
          @click="goPage(currentPage + 1)"
          :disabled="
            currentPage === totalPages
          "
        >
          &gt;
        </button>

        <button
          @click="goPage(totalPages)"
          :disabled="
            currentPage === totalPages
          "
        >
          &gt;&gt;
        </button>

      </div>

    </main>

  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onMounted,
} from 'vue'

import {
  useRoute,
  useRouter,
} from 'vue-router'

import Sidebar
  from '@/views/Sidebar.vue'

interface ColorData {

  hex: string

  h: number
  s: number
  v: number

  a: string | null
  b: string | null

  styles: string[]

  metallics: string[]
}

const route = useRoute()
const router = useRouter()

const allColors =
  ref<ColorData[]>([])

/* ===== 페이지네이션 ===== */

const currentPage = ref(1)

const ITEMS_PER_PAGE = 20

/* ===== category ===== */

const selectedCategory = computed(
  () => route.params.name as string
)

/* ===== style filter ===== */

const selectedStyles =
  ref<string[]>([])

const toggleStyle = (
  style: string
) => {

  const toneStyles = [
    'light',
    'dark',
  ]

  const saturationStyles = [
    'vivid',
    'mute',
  ]

  if (
    selectedStyles.value.includes(style)
  ) {

    selectedStyles.value =
      selectedStyles.value.filter(
        s => s !== style
      )

    return
  }

  if (
    toneStyles.includes(style)
  ) {

    selectedStyles.value =
      selectedStyles.value.filter(
        s =>
          !toneStyles.includes(s)
      )

    selectedStyles.value.push(style)

    return
  }

  if (
    saturationStyles.includes(style)
  ) {

    selectedStyles.value =
      selectedStyles.value.filter(
        s =>
          !saturationStyles.includes(s)
      )

    selectedStyles.value.push(style)

    return
  }
}

/* ===== fetch ===== */

const loadCategory = async () => {

  const type =
    route.params.type as string

  const name =
    route.params.name as string

  const response = await fetch(
    `/color_data/${type}/${name}.json`
  )

  const data = await response.json()

  allColors.value = data
  console.log(route.params)
}

/* ===== filter ===== */

const filteredColors = computed(() => {

  return allColors.value.filter(
    color => {

      if (
        selectedStyles.value.length === 0
      ) {
        return true
      }

      return selectedStyles.value.every(style => {

        if (style === 'light') {
          return color.v >= 75
        }

        if (style === 'dark') {
          return color.v < 35
        }

        if (style === 'vivid') {
          return color.s >= 50
        }

        if (style === 'mute') {
          return color.s < 50
        }

        return true
      })
    }
  )
})

/* ===== total pages ===== */

const totalPages = computed(() => {

  return Math.ceil(
    filteredColors.value.length /
    ITEMS_PER_PAGE
  )
})

/* ===== paged ===== */

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

/* ===== page move ===== */

const goPage = (
  page: number
) => {

  if (
    page < 1 ||
    page > totalPages.value
  ) {
    return
  }

  currentPage.value = page

  window.scrollTo(0, 0)
}

/* ===== visible pages ===== */

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
    {
      length:
        end - start + 1
    },

    (_, i) => start + i
  )
})

/* ===== watch ===== */

watch(

  () => route.fullPath,

  () => {

    loadCategory()

    currentPage.value = 1
  }
)

/* ===== mounted ===== */

onMounted(() => {

  loadCategory()
})
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

  padding:
    180px 60px 60px;

  display: flex;

  flex-direction: column;

  align-items: center;
}

/* ===== 상단 ===== */

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

  border-bottom:
    1px solid #eee;
}

/* ===== badge ===== */

.category-badge {

  padding: 12px 28px;

  border:
    2px solid #ddd;

  border-radius: 24px;

  font-size: 20px;

  font-weight: bold;

  text-transform: capitalize;
}

/* ===== style ===== */

.style-list {

  display: flex;

  gap: 10px;

  flex-wrap: wrap;
}

.style-button {

  padding: 8px 16px;

  border-radius: 20px;

  border: none;

  background: #e5e5e5;

  cursor: pointer;

  transition: 0.2s;
}

.style-button.active {

  background: #222;

  color: white;
}

/* ===== grid ===== */

.color-grid {

  display: grid;

  grid-template-columns:
    repeat(5, 160px);

  gap: 40px;

  justify-content: center;
}

/* ===== card ===== */

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

  transform:
    translateY(-6px);
}

/* ===== preview ===== */

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