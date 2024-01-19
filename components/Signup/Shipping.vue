<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const { t, locale } = useI18n()

const { name, mobile, firstAddress, secondAddress, shippingConfirm } = storeToRefs(useSignupStore())
const { nameRegex, mobileRegex, navigateToNNextStep, displayToast, limitTextLength } = useUtils()

const formData: SignupFormData = reactive({
  name: name.value,
  mobile: mobile.value,
  firstAddress: firstAddress.value,
  secondAddress: secondAddress.value
})

const layer = ref(null)
const postCodeModal = ref(false)

const submitTrigger = computed(() => {
  return !formData.name || !formData.mobile || !formData.firstAddress || !formData.secondAddress
})

const shippingSchema = object({
  name: string()
    .required(t('message.nameRequired'))
    .matches(nameRegex, t('message.nameFormat') + t('message.nameSpecialFormat')),
  mobile: string()
    .required(t('message.mobileRequired'))
    .min(10, t('message.mobileLength'))
    .max(13, t('message.mobileLength'))
    .test('additionalMobileValidate', t('message.mobileLength'), () => {
      return mobileLengthCheck()
    })
    .matches(mobileRegex, t('message.mobileFormat')),
  secondAddress: string()
    .test('firstAddress', t('message.addressSearch'), () => {
      return !!formData.firstAddress
    })
    .required(t('message.addressRequired'))
})

type Schema = InferType<typeof shippingSchema>

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  if (!event.isTrusted) { return }
  nextTick(updateValuesAndNavigate)
}

const updateValuesAndNavigate = () => {
  updateFormValues()
  displayToast(t('message.verifyShipping'), 'indigo', 3000)
  shippingConfirm.value = true
  navigateToNNextStep()
}

const updateFormValues = () => {
  name.value = formData.name.toString()
  mobile.value = formData.mobile.toString()
  firstAddress.value = formData.firstAddress.toString()
  secondAddress.value = formData.secondAddress.toString()
}

const openDaumPostCode = async () => {
  try {
    postCodeModal.value = true
    await new daum.Postcode({
      oncomplete: (data: DaumAddress) => {
        formData.firstAddress = locale.value === 'ko' ? data.address : data.addressEnglish
        postCodeModal.value = false
      }
    }).embed(layer.value)
  } catch (error) {
    console.warn(error)
  }
}

const mobileLengthCheck = () => {
  if (formData.mobile.toString().length > 11 && formData.mobile.toString().length < 14 && !formData.mobile.toString().includes('-')) {
    formData.mobile = formData.mobile.toString().slice(0, 11)
  }
  return true
}

</script>

<template>
  <div>
    <BLForm
      :schema="shippingSchema"
      :state="formData"
      class="w-[300px] mx-auto mt-10 space-y-6"
      @submit="onSubmit"
    >
      <BLFormGroup
        :label="$t('label.name')"
        name="name"
        size="xl"
        required
      >
        <BLInput
          v-model="formData.name"
          color="indigo"
          :placeholder="$t('message.nameRequired')"
          aria-label="name"
        />
      </BLFormGroup>
      <BLFormGroup
        :label="$t('label.mobile')"
        name="mobile"
        size="xl"
        required
      >
        <BLInput
          v-model="formData.mobile"
          type="mobile"
          color="indigo"
          :placeholder="$t('message.mobileRequired')"
          aria-label="email"
          @keyup="() => formData.mobile = limitTextLength(formData.mobile.toString(), 13)"
        />
      </BLFormGroup>
      <BLFormGroup
        :label="$t('label.address')"
        class="flex justify-between"
        size="xl"
        required
      >
        <AButton
          :button-text="$t('button.address')"
          @click:bl-button="openDaumPostCode"
        />
      </BLFormGroup>
      <BLFormGroup size="xl">
        <BLInput
          v-model="formData.firstAddress"
          color="indigo"
          disabled
          :placeholder="$t('message.addressRequired')"
          aria-label="email"
        />
      </BLFormGroup>
      <BLFormGroup
        name="secondAddress"
        size="xl"
        required
      >
        <BLInput
          v-model="formData.secondAddress"
          color="indigo"
          :placeholder="$t('message.addressRequired')"
          aria-label="email"
        />
      </BLFormGroup>
      <AButton
        button-block
        button-type="submit"
        :button-disabled="submitTrigger"
        :button-text="$t('button.next')"
      />
    </BLForm>
    <div
      v-show="postCodeModal"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center border-4 rounded-md border-indigo-600 dark:border-indigo-400"
    >
      <div class="flex justify-center items-center bg-black px-4 py-2">
        <span class="text-xl">
          {{ $t('label.addressSearch') }}
        </span>
        <div class="flex-auto" />
        <AButton
          :button-text="$t('button.close')"
          @click:bl-button="() => postCodeModal = false"
        />
      </div>
      <div
        ref="layer"
        class="relative"
      />
    </div>
  </div>
</template>
