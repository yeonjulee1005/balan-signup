<template>
  <div>
    단계별 회원가입 컴포넌트 삽입
    <div>
      회원가입임
    </div>
    <BLForm
      z:schema="schema"
      :state="formData"
      class="space-y-2"
      @submit="onSubmit"
    >
      <BLFormGroup
        :label="$t('tech.password')"
        name="password"
        size="xl"
        required
      >
        <bLInput
          v-model="formData.name"
          color="emerald"
          :placeholder="$t('placeholder.inputPassword')"
          aria-label="name"
        />
      </BLFormGroup>
    </BLForm>
  </div>
</template>

<script setup lang="ts">

import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const toast = useToast()
const { t } = useI18n()

const schema = object({
  name: string()
    .min(2, t('messages.nameFormat'))
    .max(20, t('messages.nameFormat'))
    .required(t('messages.nameRequire')),
  email: string()
    .email(t('messages.emailFormat'))
    .required(t('messages.emailRequire')),
  message: string()
    .min(20, t('messages.contentFormat'))
    .required(t('messages.contentRequire'))
})

type Schema = InferType<typeof schema>

const formData = reactive({
  name: '',
  email: '',
  message: ''
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  if (!event.isTrusted) { return }
  await toast.add({ title: t('messages.successEmailSend'), color: 'emerald', timeout: 3000 })
}

</script>
