<script setup lang="ts">

if (process.server) {
  useHead({
    title: '발란 FE 회원가입 과제',
    htmlAttrs: {
      lang: 'ko'
    },
    meta: () => [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
      { name: 'author', content: 'Dewdew' },
      { name: 'description', content: '발란 FE 회원가입 과제' },
      { name: 'keywords', content: 'Balan' }
    ]
  })
}

</script>

<template>
  <div>
    <NuxtLayout>
      <template #signup>
        <NuxtLoadingIndicator
          :height="10"
          color="repeating-linear-gradient(to right,#F9F9F9 0%,#11069E 100%)"
        />
        <NuxtPage />
        <BLNotifications />
      </template>
    </NuxtLayout>
  </div>
</template>
