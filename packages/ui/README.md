# agribank UI package built with react and MUI

Includes ui components to facilitate building UI apps for agribank. Note that you MUST use the components exported from here
instead of importing the directly from `mui` (if their counter part exists).

# Notes

Consumers of this package must have a build process using vite, webpack or similar tools because we do not bundle css files.

TODO:

1. move stuff out of assets and into public, all fonts/images are getting inlined!
