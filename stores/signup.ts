import { defineStore } from 'pinia'

export const useSignupStore = defineStore('signup', () => {
  const signupStep = ref<number>(0)

  const name = ref<string>('')
  const mobile = ref<string>('')
  const email = ref<string>('')
  const password = ref<string>('')
  const passwordConfirm = ref<string>('')

  const firstAddress = ref<string>('')
  const secondAddress = ref<string>('')
  const address = computed<string>(() => `${firstAddress.value} ${secondAddress.value}`)

  const firstCardNum = ref<string>('')
  const secondCardNum = ref<string>('')
  const thirdCardNum = ref<string>('')
  const fourthCardNum = ref<string>('')
  const cardCombination = computed<string>(() => `${firstCardNum.value}-${secondCardNum.value}-${thirdCardNum.value}-${fourthCardNum.value}`)

  const privacyConfirm = ref<boolean>(false)
  const shippingConfirm = ref<boolean>(false)
  const paymentConfirm = ref<boolean>(false)

  const initSignupStore = () => {
    name.value = ''
    mobile.value = ''
    email.value = ''
    password.value = ''
    passwordConfirm.value = ''
    firstAddress.value = ''
    secondAddress.value = ''
    firstCardNum.value = ''
    secondCardNum.value = ''
    thirdCardNum.value = ''
    fourthCardNum.value = ''
    privacyConfirm.value = false
    shippingConfirm.value = false
    paymentConfirm.value = false
  }

  return {
    signupStep,
    name,
    mobile,
    email,
    password,
    passwordConfirm,
    firstAddress,
    secondAddress,
    address,
    firstCardNum,
    secondCardNum,
    thirdCardNum,
    fourthCardNum,
    cardCombination,
    privacyConfirm,
    shippingConfirm,
    paymentConfirm,
    initSignupStore
  }
}, {
  persist: {
    storage: persistedState.sessionStorage
  }
})
