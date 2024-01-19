<script setup lang="ts">

const { width } = useWindowSize()

const { signupStep } = storeToRefs(useSignupStore())
const { currRoute, prevRoute } = storeToRefs(useRouteStore())

const desktopMode = computed(() => { return width.value > 500 })

const getStepFromRoute = (route: string) => parseInt(route.split('/')[2])

const moveBack = () => {
  const currentRouteStep = getStepFromRoute(currRoute.value)
  const isSameRoute = prevRoute.value === currRoute.value

  const targetStep = currentRouteStep > 4 || isSameRoute ? 0 : signupStep.value - 1
  const targetRoute = targetStep === 0 ? '/' : `/signup/${targetStep}`

  signupStep.value = targetStep
  navigateTo(targetRoute)
}

</script>

<template>
  <div class="w-full flex items-center gap-4 h-20 px-4 fixed top-0">
    <NuxtLink
      v-if="currRoute === '/' || currRoute === '/signup/success'"
      name="logo-link"
      to="/"
    >
      <NuxtImg
        src="/images/logo.png"
        preload
        :width="desktopMode ? 200 : 100"
        :height="desktopMode ? 36: 18"
        :draggable="false"
        alt="logo"
      />
    </NuxtLink>
    <AButton
      v-else
      use-icon
      icon-name="line-md:arrow-left"
      :icon-size="24"
      :button-text="$t('button.back')"
      @click:bl-button="moveBack"
    />
    <div class="flex-auto" />
    <ATheme />
    <ALanguage />
  </div>
</template>
