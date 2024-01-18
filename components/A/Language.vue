<script setup lang="ts">

const { t, locale, setLocale } = useI18n()

const locales = [
  { label: t('locale.ko'), value: 'ko' },
  { label: t('locale.en'), value: 'en' }
]

const selectLocale = computed({
  get () {
    return locale.value
  },
  set (value) {
    setLocale(value)
  }
})

</script>

<template>
  <BLSelectMenu
    v-model="selectLocale"
    color="indigo"
    size="md"
    variant="outline"
    :options="locales"
    value-attribute="value"
    option-attribute="label"
  >
    <template #label>
      <Icon
        :name="selectLocale === 'ko' ? 'circle-flags:kr' : 'circle-flags:us'"
        :width="24"
        :height="24"
      />
      {{ selectLocale }}
    </template>
  </BLSelectMenu>
</template>
