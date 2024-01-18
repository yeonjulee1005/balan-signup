<template>
  <div class="flex justify-center gap-8 sticky bottom-4 pointer">
    <NuxtLink
      class="dark:bg-neutral-50 rounded-lg"
      to="https://github.com/yeonjulee1005"
      external
    >
      <Icon
        name="devicon:github"
        :width="32"
        :height="32"
      />
    </NuxtLink>
    <NuxtLink
      to="https://www.linkedin.com/in/dewdew/"
      external
    >
      <Icon
        name="devicon:linkedin"
        :width="32"
        :height="32"
      />
    </NuxtLink>
  </div>
</template>
