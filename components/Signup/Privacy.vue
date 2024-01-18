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
    <BLButton
      color="indigo"
      size="xl"
      block
      variant="soft"
      type="submit"
      :disabled="submitTrigger"
    >
      {{ $t('button.next') }}
    </BLButton>
  </BLForm>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const toast = useToast()
const { t } = useI18n()

const { email, password, passwordConfirm } = storeToRefs(useSignupStore())
const { emailRegex, passwordRegex, navigateToNNextStep } = useUtils()

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
  submitTrigger.value = !isMatch
  return isMatch
}

const formData = reactive({
  email: '',
  password: '',
  passwordConfirm: ''
})

const submitTrigger = ref(true)

type Schema = InferType<typeof privacySchema>

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  if (!event.isTrusted) { return }
  await nextTick(updateValuesAndNavigate)
}

const updateValuesAndNavigate = async () => {
  updateFormValues()
  await showPolicyToast()
  navigateToNNextStep()
}

const updateFormValues = () => {
  email.value = formData.email
  password.value = formData.password
  passwordConfirm.value = formData.passwordConfirm
}

const showPolicyToast = async () => {
  await toast.add({ title: t('message.verifyPolicy'), color: 'indigo', timeout: 3000 })
}

</script>
