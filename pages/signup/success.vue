<script setup lang="ts">

const { email, name, mobile, address, cardCombination } = storeToRefs(useSignupStore())

</script>

<template>
  <div class="min-h-screen w-full flex flex-col justify-center items-center gap-2">
    <p class="w-[200px] text-3xl break-keep text-center leading-10 mb-8">
      {{ $t('success.title', { name }) }}
    </p>
    <p class="text-lg">
      {{ $t('success.email', { email }) }}
    </p>
    <p class="text-lg">
      {{ $t('success.mobile', { mobile }) }}
    </p>
    <p class="text-lg">
      {{ $t('success.address', { address }) }}
    </p>
    <p class="text-lg">
      {{ $t('success.card', { card: cardCombination }) }}
    </p>
  </div>
</template>
