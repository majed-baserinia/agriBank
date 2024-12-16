# agribank UI package built with react and MUI

Includes ui components to facilitate building UI apps for agribank.

# Notes

1. Consumers of this package must have a build process using vite, webpack or similar tools because we do not bundle css files.
2. it's better to use the components exported from here instead of importing them directly from `mui` (if their counter part exists).

TODO:

1. move stuff out of assets and into public, all fonts/images are getting inlined!
2. refactor!
