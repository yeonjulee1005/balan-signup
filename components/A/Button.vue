<script setup lang="ts">
import type { ButtonSize, ButtonVariant } from '@nuxt/ui/dist/runtime/types/button'

withDefaults(
  defineProps<{
    buttonSize?: ButtonSize | undefined
    buttonColor?: string
    buttonVariant?: ButtonVariant | undefined
    buttonPadded?: boolean
    buttonBlock?: boolean
    buttonAriaLabel?: string
    buttonType?: string
    buttonDisabled?: boolean
    useIcon?: boolean
    iconName?: string
    iconSize?: number
    buttonText?: string
  }>(),
  {
    buttonSize: 'xl',
    buttonColor: 'indigo',
    buttonVariant: 'soft',
    buttonPadded: true,
    buttonBlock: false,
    buttonAriaLabel: 'button',
    buttonType: '',
    buttonDisabled: false,
    useIcon: false,
    iconName: '',
    iconSize: 24,
    buttonText: ''
  }
)

defineEmits(['click:bl-button'])

</script>

<template>
  <BLButton
    :size="buttonSize"
    :color="buttonColor"
    :variant="buttonVariant"
    :padded="buttonPadded"
    :block="buttonBlock"
    :type="buttonType"
    :disabled="buttonDisabled"
    :aria-label="buttonText"
    @click="$emit('click:bl-button')"
  >
    <template #leading>
      <Icon
        v-if="useIcon"
        :name="iconName"
        :height="iconSize"
        :width="iconSize"
      />
    </template>
    {{ buttonText }}
  </BLButton>
</template>
