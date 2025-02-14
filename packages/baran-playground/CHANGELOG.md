# @agribank/baran-playground

## 0.11.2

### Patch Changes

- 37852c0: fix(playground/i18n/ui): typos and actually allow label override for otp
- Updated dependencies [37852c0]
  - @agribank/i18n@0.6.1
  - @agribank/ui@6.2.2

## 0.11.1

### Patch Changes

- cfd7db5: fix(baran-playground): show pending state for upgrade to level 2

## 0.11.0

### Minor Changes

- 97ed009: feat(baran-playground): allow upgrading to level2

### Patch Changes

- Updated dependencies [a4ebcb4]
- Updated dependencies [c87caeb]
  - @agribank/ui@6.2.1

## 0.10.3

### Patch Changes

- Updated dependencies [84940ed]
  - @agribank/ui@6.2.0
  - @agribank/baran-typed-querykit@10.0.0
  - @agribank/ignite@13.0.0

## 0.10.2

### Patch Changes

- f0d8274: fix(baran-playground): send otp data correctly in postmessage

## 0.10.1

### Patch Changes

- 13f5ab4: fix(baran-playground): add otp type top postmessage handler
- 26c38e7: chore: improve design
- Updated dependencies [590c2a9]
  - @agribank/ui@6.1.0
  - @agribank/baran-typed-querykit@9.0.0
  - @agribank/ignite@12.0.0

## 0.10.0

### Minor Changes

- e8accfe: feat(baran-playground): send dummy sms code when receiving OTP request

### Patch Changes

- 2744035: feat: allow sending message as a function callback instead of sending it on load
- 0479e0c: fix(baran-playground): don't resend request on login request errors
- ac39e48: chore: updated mui dependency version
- 5e9998b: chore: update tanstack router versions
- 5fbb6ae: chore(baran-playground): lower alerts times
- Updated dependencies [992c247]
- Updated dependencies [6329c79]
- Updated dependencies [351d43d]
- Updated dependencies [2744035]
- Updated dependencies [ac39e48]
- Updated dependencies [e18453c]
- Updated dependencies [d921708]
- Updated dependencies [7d76deb]
- Updated dependencies [5e9998b]
- Updated dependencies [cd2a12e]
- Updated dependencies [1885e92]
- Updated dependencies [7fe5c5d]
- Updated dependencies [87c27be]
- Updated dependencies [27e9225]
- Updated dependencies [afc1a20]
  - @agribank/ui@6.0.0
  - @agribank/post-message@0.4.0
  - @agribank/baran-typed-querykit@8.0.0
  - @agribank/ignite@11.0.0
  - @agribank/i18n@0.6.0

## 0.9.0

### Minor Changes

- 81fdee7: chore: upgraded to react 19

### Patch Changes

- Updated dependencies [81fdee7]
  - @agribank/baran-typed-querykit@7.0.0
  - @agribank/post-message@0.3.0
  - @agribank/ignite@10.0.0
  - @agribank/i18n@0.5.0
  - @agribank/ui@5.0.0

## 0.8.0

### Minor Changes

- 9755d5d: feat(baran-playground): allow `-` as user-pass to prevent making login requests in playground

### Patch Changes

- aa32185: chore(all-tanstack-dependants): updated packages
- 9349411: chore(baran-playgroud/template): updated playwright version
- Updated dependencies [aa32185]
  - @agribank/baran-typed-querykit@6.0.2
  - @agribank/ignite@9.0.2
  - @agribank/ui@4.0.1

## 0.7.1

### Patch Changes

- cf6f62d: fix(baran-playground): run spawn with shell flag

## 0.7.0

### Minor Changes

- d3e84d1: feat(baran-playground): support having custom environment

### Patch Changes

- 3a1ee37: chore: renamed apiBaseUrl to baseApiUrl
- Updated dependencies [3a1ee37]
  - @agribank/baran-typed-querykit@6.0.1
  - @agribank/ignite@9.0.1

## 0.6.0

### Minor Changes

- 04ed6e7: feat: handle net-err and show better error-message

### Patch Changes

- Updated dependencies [04ed6e7]
  - @agribank/baran-typed-querykit@6.0.0
  - @agribank/i18n@0.4.0
  - @agribank/ignite@9.0.0
  - @agribank/ui@4.0.0

## 0.5.1

### Patch Changes

- c503cbd: chore(baran-playground): use the exported Tanstack component from ui package
- Updated dependencies [66c3e7f]
- Updated dependencies [e4bc9b5]
  - @agribank/ui@3.3.0
  - @agribank/baran-typed-querykit@5.0.0
  - @agribank/ignite@8.0.0

## 0.5.0

### Minor Changes

- 9ef9797: feat: support multiple accounts per environment for playground

### Patch Changes

- 190032e: feat: integrate tests into our templates
- Updated dependencies [190032e]
- Updated dependencies [9ef9797]
  - @agribank/ui@3.2.0
  - @agribank/ignite@7.0.0
  - @agribank/baran-typed-querykit@4.0.0

## 0.4.2

### Patch Changes

- d41437c: feat(baran-playground): alert to reload iframe if environment has change
- 39c0969: feat(baran-playground): toggle microfront navbar if we on the micro page
- 153ee99: design(baran-playground): show/hide micro toolbar if we are on the iframe page
- 818b734: fix: update login info if environment changes
- Updated dependencies [a76b559]
- Updated dependencies [f01f333]
- Updated dependencies [05cfc97]
  - @agribank/ignite@6.0.3
  - @agribank/baran-typed-querykit@3.0.2

## 0.4.1

### Patch Changes

- c350410: fix: added --build flag to our templates and resolved issues with tsconfig of these projects
- Updated dependencies [c350410]
  - @agribank/ui@3.1.1

## 0.4.0

### Minor Changes

- f8711ef: chore: updated zustand version
- 8175a98: chore: use same @types/node for all packages

### Patch Changes

- Updated dependencies [f8711ef]
- Updated dependencies [e53f7fc]
- Updated dependencies [8175a98]
  - @agribank/baran-typed-querykit@3.0.0
  - @agribank/ignite@6.0.0
  - @agribank/ui@3.1.0

## 0.3.0

### Minor Changes

- 29863e7: feat: add schema for config file

### Patch Changes

- Updated dependencies [29863e7]
  - @agribank/ignite@5.2.0

## 0.2.3

### Patch Changes

- e0cd861: chore(baran-playground): added prettierconfig

## 0.2.2

### Patch Changes

- 94cb582: chore: ran prettier and added format command

## 0.2.1

### Patch Changes

- e37349b: chore(baran-playground): updated readme
- 04abe75: fix(baran-playground): don't show router devtools on prod builds

## 0.2.0

### Minor Changes

- 641f978: refactor(baran-playground/ignite): separate router specific code from ignite package

### Patch Changes

- Updated dependencies [641f978]
  - @agribank/ignite@5.1.0

## 0.1.0

### Minor Changes

- 3b7f89c: feat(baran-playground): handle postmessage events
- d21f563: chore(baran-playground): renamed executable froma agribank-playground to baran-playground
- bf0599f: chore(baran-playground): ui improvements
- 44bc6a5: refactor(ignite): used sliced store and removed custom sessionStorage manager and used zustand/persisted instead
- 5284ae4: feat: completed playground

### Patch Changes

- Updated dependencies [9a90db5]
- Updated dependencies [09c8da1]
- Updated dependencies [44bc6a5]
- Updated dependencies [8b7f48c]
- Updated dependencies [5284ae4]
- Updated dependencies [0b7e803]
  - @agribank/ui@3.0.0
  - @agribank/ignite@5.0.0
  - @agribank/baran-typed-querykit@2.0.0
  - @agribank/post-message@0.2.0
  - @agribank/i18n@0.3.0
