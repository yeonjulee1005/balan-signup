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
  <AButton
    button-size="md"
    button-variant="outline"
    button-aria-label="theme"
    use-icon
    :icon-name="isDark ? 'line-md:moon-filled-loop' : 'line-md:moon-filled-alt-to-sunny-filled-loop-transition'"
    :icon-size="24"
    @click:bl-button="isDark = !isDark"
  />
</template>
