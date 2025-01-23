# Summary

1. uses `@agribank/*` packages
2. uses [standard big-scale react app project structure](https://profy.dev/article/react-folder-structure#exit-group-by-features)
3. uses file-based [routing of tanstack router](https://tanstack.com/router/latest/docs) (located in routes/\*)
4. generate clients using `@agribank/client-generator` (see `--options` for more info)
   1. uncomment code in services/clients
   2. uncomment `useInitClients` in +root.tsx
   3. if you don't want to use our `client-generator` you can simply remove these lines
5. if you are dealing with baran apis you can optionally install the `@agribank/baran-typed-querykit` package which types the response models and provides utilities for calling out to baran apis.
6. you can modify the public/config.json to include the `baseThemeUrl` key and point to your own version of base mui theme or point to your public folder via `@local/base-theme/` or to `@agribank/ui` version via `@agribank/base-theme/`

# Notes

1. in production you won't deploy the **default** files in `public/` folder. You can only deploy the files that you have created!
