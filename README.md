## 이연주 FE 과제 제출

## 사용 주요 기술스택:

- Nuxt3
- TypeScript
- Tailwind
- Nuxt/UI
- Pinia

---

## 기술 온보딩

### 사용 모듈

1. Nuxt3를 이용하여 회원가입 과제 요구사항을 구현하였습니다.
2. Tailwind를 기본 지원하는 Nuxt/UI를 사용함으로써, 효율적으로 디자인 시스템을 구축하였습니다.
3. Atomic 디자인 패턴을 지향하며 컴포넌트 분할을 진행하였습니다. (공통 및 Atom 단위의 컴포넌트 분할 및 회원가입 템플릿 분리)
4. Pinia를 활용한 스토어 설정을 진행하였습니다. 각 회원 가입의 데이터는 새선스토리지에 저장되도록 설정하여, 새션 만료시 휘발될 수 있도록 하였습니다.
5. Nuxt/i18n을 사용하여, Localization 처리를 진행하였습니다. (다음 주소api에서 전달받는 주소 또한, local이 영문일 경우, 영어를 받을 수 있도록 구현)
6. eslint를 통해 린팅 처리를 진행하였으며, stylelint를 통한 스타일린트 린팅을 진행할 수 있도록 조치해두었습니다.
7. Nuxt/image 를 통해 메인 Header 및 Footer에 있는 이미지에 대한 최적화를 진행하였습니다.
8. Nuxt/color-mode를 이용하여 다크모드를 구현해 두었습니다.

### 레이아웃 구조
> 아래와 같이 레이아웃 구조를 잡았습니다.

```bash
app.vue
├── layouts
│   └── default.vue
├── pages
│   ├── index.vue
│   └── signup
│       ├── [step].vue
│       └── success.vue
├── components
│   ├── A
│   │   ├── Button.vue
│   │   ├── Footer.vue
│   │   ├── Header.vue
│   │   ├── Language.vue
│   │   └── Theme.vue
│   └── Signup
│       ├── Privacy.vue
│       ├── Shipping.vue
│       └── Payment.vue
├── composables
├── styles
├── locales
└── stores

``` 

1. `app.vue` : 레아아웃으로 래핑된 페이지에 각 페이지에 포함될 Loading Indicator, Notifications을 공통으로 호출합니다.
2. `default.vue`: 각 페이지의 레이아웃으로, 상단의 헤더, 푸터를 공통으로 추출 구현하였습니다.
3. `index.vue` : 회원가입 절차를 진행할 수 있는 페이지입니다. 중앙 회원가입 버튼을 클릭하면 진입합니다.
4. `[step].vue` : 회원가입 절차가 진행되는 페이지입니다. 각 페이지 라우트를 쿼리 파라미터를 확인하여 각 단계가 진행되도록 구현하였습니다.
4. `success.vue` : 회원가입 성공페이지 입니다. 상단 로고를 클릭하면 메인으로 돌아갑니다.
5. `Privacy.vue`: 개인정보 입력화면의 템플릿 입니다.
6. `Shipping.vue`: 배송지정보 입력화면의 템플릿 입니다.
7. `Payment.vue`: 결제정보 입력화면의 템플릿 입니다.

각 단계에 모든내용을 validate 확인 이후 store에 저장 하여, 이전 화면으로 이동하여도 다시 입력하지 않도록 처리 해 두었습니다.
사용된 공통함수들은 composable화 하여 별도보관처리 하였습니다.