<template>
  <div>
    <NuxtLayout>
      <template #signup>
        <NuxtLoadingIndicator
          :height="10"
          color="repeating-linear-gradient(to right,#F9F9F9 0%,#11069E 100%)"
        />
        <NuxtPage />
      </template>
    </NuxtLayout>
  </div>
</template>
