<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const { t } = useI18n()

const { firstCardNum, secondCardNum, thirdCardNum, fourthCardNum, paymentConfirm } = storeToRefs(useSignupStore())
const { displayToast, limitTextLength } = useUtils()

const emit = defineEmits(['verification:sign-up'])

const paymentSchema = object({
  card: string()
    .test('passwordConfirmMatch', t('message.cardVerified'), () => {
      return validCreditCardNumber()
    })
})

const formData: SignupFormData = reactive({
  firstCardNum: firstCardNum.value,
  secondCardNum: secondCardNum.value,
  thirdCardNum: thirdCardNum.value,
  fourthCardNum: fourthCardNum.value
})

const submitTrigger = computed({
  get: () => {
    return !paymentSchema.isValidSync(formData)
  },
  set: (value) => {
    return value
  }
})

type Schema = InferType<typeof paymentSchema>

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  if (!event.isTrusted) { return }
  nextTick(updateValuesAndNavigate)
}

const updateValuesAndNavigate = () => {
  updateFormValues()
  displayToast(t('message.verifyPayment'), 'indigo', 3000)
  paymentConfirm.value = true
  emit('verification:sign-up')
}

const updateFormValues = () => {
  firstCardNum.value = formData.firstCardNum.toString()
  secondCardNum.value = formData.secondCardNum.toString()
  thirdCardNum.value = formData.thirdCardNum.toString()
  fourthCardNum.value = formData.fourthCardNum.toString()
}

const validCreditCardNumber = () => {
  const cardNumber = formData.firstCardNum.toString().concat(formData.secondCardNum.toString(), formData.thirdCardNum.toString(), formData.fourthCardNum.toString())
  const reverseCardNumber = cardNumber.split('').reverse()

  let sum = 0
  let isEvenPosition = false

  reverseCardNumber.forEach((char, index) => {
    let digit = parseInt(char, 10)

    if (index % 2 === 1) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    sum += digit
    isEvenPosition = !isEvenPosition
  })

  return sum % 10 === 0
}

</script>

<template>
  <BLForm
    :schema="paymentSchema"
    :state="formData"
    class="w-[320px] mx-auto mt-10 space-y-6"
    @submit="onSubmit"
  >
    <BLFormGroup
      :label="$t('label.card')"
      size="xl"
      name="card"
      required
    >
      <template #default>
        <div class="flex gap-4 mt-4">
          <BLInput
            v-model="formData.firstCardNum"
            color="indigo"
            aria-label="firstCardNum"
            @keyup="() => formData.firstCardNum = limitTextLength(formData.firstCardNum.toString(), 4) ?? ''"
          />
          <BLInput
            v-model="formData.secondCardNum"
            color="indigo"
            aria-label="secondCardNum"
            @keyup="() => formData.secondCardNum = limitTextLength(formData.secondCardNum.toString(), 4) ?? ''"
          />
          <BLInput
            v-model="formData.thirdCardNum"
            color="indigo"
            aria-label="thirdCardNum"
            @keyup="() => formData.thirdCardNum = limitTextLength(formData.thirdCardNum.toString(), 4) ?? ''"
          />
          <BLInput
            v-model="formData.fourthCardNum"
            color="indigo"
            aria-label="fourthCardNum"
            @keyup="() => formData.fourthCardNum = limitTextLength(formData.fourthCardNum.toString(), 4) ?? ''"
          />
        </div>
      </template>
    </BLFormGroup>
    <AButton
      button-block
      button-type="submit"
      :button-disabled="submitTrigger"
      :button-text="$t('button.next')"
    />
  </BLForm>
</template>
