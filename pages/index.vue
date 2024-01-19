<script setup lang="ts">

const signupStore = useSignupStore()
const { signupStep } = storeToRefs(signupStore)
const { initSignupStore } = signupStore

const moveToSignupStep = () => {
  signupStep.value = signupStep.value ? 1 : signupStep.value + 1
  navigateTo(`/signup/${signupStep.value}`)
}

initSignupStore()

</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center gap-8">
    <p class="text-4xl font-bold">
      {{ $t('title.balan') }}
    </p>
    <BLButton
      color="indigo"
      size="xl"
      padded
      :ui="{ base: 'hover:bg-indigo-400 transition-color ease-in-out duration-400' }"
      @click="moveToSignupStep"
    >
      {{ $t('button.signup') }}
    </BLButton>
    <AFooter />
  </div>
</template>
