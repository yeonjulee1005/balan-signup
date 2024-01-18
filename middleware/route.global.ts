export default defineNuxtRouteMiddleware((to, from) => {
  const { currRoute, prevRoute } = storeToRefs(useRouteStore())

  // route 히스토리 기록
  currRoute.value = to.path
  prevRoute.value = from.path
})
