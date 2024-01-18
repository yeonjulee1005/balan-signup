<script setup lang="ts">

const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

</script>

<template>
  <BLButton
    color="indigo"
    size="md"
    variant="outline"
    aria-label="theme"
    @click="isDark = !isDark"
  >
    <template #leading>
      <Icon
        :name="isDark ? 'line-md:moon-filled-loop' : 'line-md:moon-filled-alt-to-sunny-filled-loop-transition'"
        :width="24"
        :height="24"
      />
    </template>
  </BLButton>
</template>
