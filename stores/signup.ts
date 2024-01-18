import { defineStore } from 'pinia'

export const useSignupStore = defineStore('signup', () => {
  const signupStep = ref<number>(0)

  const name = ref<string>('')
  const mobile = ref<string>('')
  const email = ref<string>('')
  const password = ref<string>('')
  const passwordConfirm = ref<string>('')
  const address = ref<string>('')
  const cardNumber = ref<string>('')

  const privacyConfirm = ref<boolean>(false)
  const shippingConfirm = ref<boolean>(false)
  const paymentConfirm = ref<boolean>(false)

  return {
    signupStep,
    name,
    mobile,
    email,
    password,
    passwordConfirm,
    address,
    cardNumber,
    privacyConfirm,
    shippingConfirm,
    paymentConfirm
  }
}, {
  persist: {
    storage: persistedState.sessionStorage
  }
})
