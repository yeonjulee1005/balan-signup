<script setup lang="ts">

const { width } = useWindowSize()

const { signupStep } = storeToRefs(useSignupStore())
const { currRoute, prevRoute } = storeToRefs(useRouteStore())

const desktop = computed(() => {
  return width.value > 500
})

const getStepFromRoute = (route: string) => parseInt(route.split('/')[2])

const moveBack = () => {
  const prevStep = getStepFromRoute(prevRoute.value)
  const isSameRoute = prevRoute.value === currRoute.value
  const isPrevStepHigher = prevStep > 2
  const isFirstSignupStep = signupStep.value === 1
  const isPrevStepLower = getStepFromRoute(prevRoute.value) > getStepFromRoute(currRoute.value)

  const resetSignupAndNavigateHome = () => {
    signupStep.value = 0
    navigateTo('/')
  }

  if (isSameRoute || isPrevStepHigher || isFirstSignupStep || isPrevStepLower) {
    resetSignupAndNavigateHome()
  } else {
    signupStep.value--
    navigateTo(prevRoute.value)
  }
}

</script>

<template>
  <div class="w-full flex items-center gap-4 h-20 px-4 fixed top-0">
    <NuxtImg
      v-if="currRoute === '/'"
      src="https://i.balaan.io/mobile/img/icons/logo-blue.png"
      preload
      :width="desktop ? 200 : 100"
      height="auto"
      :draggable="false"
      alt="logo"
    />
    <BLButton
      v-else
      size="xl"
      color="indigo"
      @click="moveBack"
    >
      {{ $t('button.back') }}
    </BLButton>
    <div class="flex-auto" />
    <ATheme />
    <ALanguage />
  </div>
</template>
