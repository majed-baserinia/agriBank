# @agribank/ui

## 6.2.3

### Patch Changes

- c33e174: chore(all-packages): remove source maps
- Updated dependencies [c33e174]
  - @agribank/i18n@0.6.2

## 6.2.2

### Patch Changes

- 37852c0: fix(playground/i18n/ui): typos and actually allow label override for otp
- Updated dependencies [37852c0]
  - @agribank/i18n@0.6.1

## 6.2.1

### Patch Changes

- a4ebcb4: fix(ui): correctly support refresh button variant
- c87caeb: fix(ui): make onChange of SwitchAdapter optional

## 6.2.0

### Minor Changes

- 84940ed: feat(ui): added guard component

## 6.1.0

### Minor Changes

- 590c2a9: feat(ui): allow passing customs sx to chips adapter

## 6.0.0

### Patch Changes

- 992c247: feat(ui): define prop types for AppAlert
- 6329c79: fix(ui): make alertType optional
- 351d43d: feat(ui): improve alert component with padding, icons, and types
- 2744035: feat: allow sending message as a function callback instead of sending it on load
- ac39e48: chore: updated mui dependency version
- d921708: feat(ui): improve ChipStatusAdapter
- 7d76deb: feat(ui): adjust height of MuiInputBase
- 5e9998b: chore: update tanstack router versions
- cd2a12e: feat(ui): enhance ButtonAdapter with loading state
- 7fe5c5d: feat(ui): enhance BottomSheetSelect, add backdrop on tap
- 87c27be: feat(ui): enhance OTP component with showButton, alertType, alertMessage props and types and fix ResOTP
- 27e9225: feat(ui): enhance AutoCompleteAdapter, add type and disable props
- afc1a20: chore(ui): rename handleSend to on onSendSmsClick
- Updated dependencies [1885e92]
  - @agribank/i18n@0.6.0

## 5.0.0

### Minor Changes

- 81fdee7: chore: upgraded to react 19

### Patch Changes

- Updated dependencies [81fdee7]
  - @agribank/i18n@0.5.0

## 4.0.1

### Patch Changes

- aa32185: chore(all-tanstack-dependants): updated packages

## 4.0.0

### Patch Changes

- Updated dependencies [04ed6e7]
  - @agribank/i18n@0.4.0

## 3.3.0

### Minor Changes

- 66c3e7f: feat(ui): add tanstack devtools component
- e4bc9b5: feat(ui): add tanstack/link component

## 3.2.0

### Minor Changes

- 9ef9797: feat: support multiple accounts per environment for playground

### Patch Changes

- 190032e: feat: integrate tests into our templates

## 3.1.2

### Patch Changes

- 61e6546: fix(ui): re-add node files and baseUrl to tsconfig

## 3.1.1

### Patch Changes

- c350410: fix: added --build flag to our templates and resolved issues with tsconfig of these projects

## 3.1.0

### Minor Changes

- f8711ef: chore: updated zustand version
- 8175a98: chore: use same @types/node for all packages

### Patch Changes

- @agribank/i18n@0.3.0

## 3.0.0

### Minor Changes

- 9a90db5: refactor(ui): renamed BoxAdapter to PaperAdapter
- 09c8da1: feat: allow specifying separate theme-url and palette url
- 5284ae4: feat: completed playground

### Patch Changes

- Updated dependencies [5284ae4]
  - @agribank/i18n@0.3.0

## 2.1.1

### Patch Changes

- 26a9caf: chore: use ranged versions for @agribank packages to prevent breaking changes on each patch update
- Updated dependencies [26a9caf]
  - @agribank/i18n@0.2.1

## 2.1.0

### Minor Changes

- 200f698: feat(ui): add spaces between otp passcodes

## 2.0.0

### Minor Changes

- 38620ca: feat(ui): add error components

### Patch Changes

- 8d7b236: feat(ui): allow otp to cancel pending request and modify its inputadapter props
- Updated dependencies [41831c6]
- Updated dependencies [aeeb6a3]
- Updated dependencies [3df1c6b]
  - @agribank/i18n@0.2.0

## 1.0.0

### Minor Changes

- 4a7a5b6: feat(ui): customize table paper/table props
- 3dc3a3a: feat: add otp component

### Patch Changes

- 4546540: fix(ui): fire onChange event with SelectAdapter
- ef2bbf8: fix(ui): use noflip on global styles for rtl/ltr
- b168acf: chore: add more words and remove reverse-rtl from table pagination
- Updated dependencies [b168acf]
- Updated dependencies [3dc3a3a]
- Updated dependencies [e3daa8b]
  - @agribank/i18n@0.1.0

## 0.1.2

### Patch Changes

- 12d5e6b: fix: add @agribank/ui dist to tailwind config
- edcb88e: fix(ui): made onChange optional
- eea27b3: fix(ui): correct control buttons based on direction
- c6004b8: chore: add changelog to files prop of package.json
- Updated dependencies [c6004b8]
  - @agribank/i18n@0.0.6

## 0.1.1

### Patch Changes

- 5a83d3c: fix(ui): access base language pack for table pagination
- 537ba84: chore(ui): add named export and types for tailwindConfig
- e58b6b4: fix(ui): correctly map ui package exports to their types
- 6db5098: fix(ui): export tableadapter as named export instead of default export
  - @agribank/i18n@0.0.5

## 0.1.0

### Minor Changes

- 7438f2e: feat: custom pagination for <TableAdapter> component to allow easier infinite scroll + pagination of unknown number of pages
- 79bf2e0: feat: add controlled/uncontrolled loaders, uncontrolled loader reads from useLoader store which can be modified globally

### Patch Changes

- 9997afd: chore: update language pack
- 63f9727: fix: rename exported types for name-clashing
- Updated dependencies [9997afd]
  - @agribank/i18n@0.0.5

## 0.0.4

### Patch Changes

- Updated dependencies [73e085d]
- Updated dependencies [73e085d]
  - @agribank/i18n@0.0.4

## 0.0.3

### Patch Changes

- 4e6a080: chore: add keywords for npm and update readme files
- Updated dependencies [4e6a080]
  - @agribank/i18n@0.0.3

## 0.0.2

### Patch Changes

- acbb18d: chore: renamed all occurrences of htsc to agribank
- Updated dependencies [acbb18d]
  - @agribank/i18n@0.0.2
