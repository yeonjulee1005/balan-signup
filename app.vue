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

<script setup lang="ts">

useSeoMeta({
  title: '발란 FE 회원가입 과제',
  description: '발란 FE 회원가입 과제',
  keywords: 'Balan'
})

</script>
