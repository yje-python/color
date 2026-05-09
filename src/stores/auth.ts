import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {

    const user = ref<any>(null)

    const setUser = (data: any) => {

      user.value = data

      localStorage.setItem(
        'user',
        JSON.stringify(data)
      )
    }

    const loadUser = () => {

      const saved =
        localStorage.getItem('user')

      if (saved) {
        user.value = JSON.parse(saved)
      }
    }

    const logout = () => {

      user.value = null

      localStorage.removeItem('user')
    }

    return {
      user,
      setUser,
      loadUser,
      logout,
    }
  }
)