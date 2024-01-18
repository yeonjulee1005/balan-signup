export const useUtils = () => {
  const { signupStep } = storeToRefs(useSignupStore())

  // 한글 완성형 2자 이상의 및 영문 3자 이상의 정규식
  const nameRegex = /[\uAC00-\uD7A3]{2,}|[a-zA-Z]{3,}/

  // 이메일 정규일
  const emailRegex = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/

  // 비밀번호 정규식 (8자 이상, 영문 대문자, 소문자, 숫자, 특수문자 포함)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  // 휴대폰 번호 정규식(10자리 또는 11자리, 공백 또는 하이픈 허용)
  const mobileRegex = /^0(1[0-9])[-\s]?(\d{3,4})[-\s]?(\d{4})$/

  const navigateToNNextStep = () => {
    signupStep.value++
    navigateTo(`/signup/${signupStep.value}`)
  }

  return {
    nameRegex,
    emailRegex,
    passwordRegex,
    mobileRegex,
    navigateToNNextStep
  }
}
