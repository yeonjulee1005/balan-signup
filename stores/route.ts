import { defineStore } from 'pinia'

export const useRouteStore = defineStore('route', () => {
  const currRoute = ref<string>('')
  const prevRoute = ref<string>('')

  return {
    currRoute,
    prevRoute
  }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})
