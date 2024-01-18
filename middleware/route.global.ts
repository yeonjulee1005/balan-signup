export default defineNuxtRouteMiddleware((to, from) => {
  const { currRoute, prevRoute } = storeToRefs(useRouteStore())

  currRoute.value = to.path
  prevRoute.value = from.path
})
