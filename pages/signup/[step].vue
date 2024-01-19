<script setup lang="ts">

const { t } = useI18n()

const { signupStep, privacyConfirm, shippingConfirm, paymentConfirm } = storeToRefs(useSignupStore())

if (!signupStep.value) { navigateTo('/') }

const title = computed(() => {
  switch (signupStep.value) {
    case 1 :
      return t('title.privacy')
    case 2 :
      return t('title.shipping')
    case 3 :
      return t('title.payment')
    default :
      return ''
  }
})

const checkVerification = () => {
  if (privacyConfirm.value && shippingConfirm.value && paymentConfirm.value) {
    navigateTo('/signup/success')
  }
}

</script>

<template>
  <div class="min-h-screen w-full flex flex-col justify-center items-center">
    <div class="text-4xl font-bold mb-4">
      {{ title }}
    </div>
    <LazySignupPrivacy v-if="signupStep === 1" />
    <LazySignupShipping v-else-if="signupStep === 2" />
    <LazySignupPayment
      v-else
      @verification:sign-up="checkVerification"
    />
  </div>
</template>
