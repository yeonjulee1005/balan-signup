<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const { t } = useI18n()

const { email, password, passwordConfirm, privacyConfirm } = storeToRefs(useSignupStore())
const { emailRegex, passwordRegex, navigateToNNextStep, displayToast } = useUtils()

const privacySchema = object({
  email: string()
    .required(t('message.emailRequired'))
    .matches(emailRegex, t('message.emailFormat')),
  password: string()
    .required(t('message.passwordRequired'))
    .matches(passwordRegex, t('message.passwordFormat')),
  passwordConfirm: string()
    .required(t('message.passwordRequired'))
    .test('passwordConfirmMatch', t('message.passwordConfirmMatch'), (value) => {
      return matchPassword(value)
    })
})

const matchPassword = (passwordConfirm: string) => {
  const isMatch = passwordConfirm === formData.password
  return isMatch
}

const formData: SignupFormData = reactive({
  email: email.value,
  password: password.value,
  passwordConfirm: passwordConfirm.value
})

const submitTrigger = computed({
  get: () => {
    return !privacySchema.isValidSync(formData)
  },
  set: (value) => {
    return value
  }
})

type Schema = InferType<typeof privacySchema>

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  if (!event.isTrusted) { return }
  nextTick(updateValuesAndNavigate)
}

const updateValuesAndNavigate = () => {
  updateFormValues()
  displayToast(t('message.verifyPolicy'), 'indigo', 3000)
  privacyConfirm.value = true
  navigateToNNextStep()
}

const updateFormValues = () => {
  email.value = formData.email.toString()
  password.value = formData.password.toString()
  passwordConfirm.value = formData.passwordConfirm.toString()
}

</script>

<template>
  <BLForm
    :schema="privacySchema"
    :state="formData"
    class="w-[300px] mx-auto mt-10 space-y-6"
    @submit="onSubmit"
  >
    <BLFormGroup
      :label="$t('label.email')"
      name="email"
      size="xl"
      required
    >
      <BLInput
        v-model="formData.email"
        color="indigo"
        type="email"
        :placeholder="$t('message.emailRequired')"
        aria-label="email"
      />
    </BLFormGroup>
    <BLFormGroup
      :label="$t('label.password')"
      name="password"
      size="xl"
      required
    >
      <BLInput
        v-model="formData.password"
        type="password"
        color="indigo"
        :placeholder="$t('message.passwordRequired')"
        aria-label="email"
      />
    </BLFormGroup>
    <BLFormGroup
      :label="$t('label.passwordConfirm')"
      name="passwordConfirm"
      size="xl"
      required
    >
      <BLInput
        v-model="formData.passwordConfirm"
        type="password"
        color="indigo"
        :placeholder="$t('message.passwordConfirmRequired')"
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
</template>
