import { defineStore } from 'pinia'

export const useColorStore = defineStore('color', {
  state: () => ({
    currentColor: '',
    palette: [] as string[],

    /* 🔥 추가 */
    selectedCategory: 'red',
  }),

  actions: {
    setColor(color: string) {
      this.currentColor = color
    },

    setPalette(palette: string[]) {
      this.palette = palette
    },

    /* 🔥 추가 */
    setCategory(category: string) {
      this.selectedCategory = category
    },
  },
})