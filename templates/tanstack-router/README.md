# Summary

1. uses `@agribank/*` packages
2. uses [standard big-scale react app project structure](https://profy.dev/article/react-folder-structure#exit-group-by-features)
3. uses file-based [routing of tanstack router](https://tanstack.com/router/latest/docs) (located in routes/\*)
4. generate clients using `@agribank/client-generator` (see `--options` for more info)
   1. uncomment code in services/clients
   2. uncomment `useInitClients` in +root.tsx
   3. if you don't want to use our `client-generator` you can simply remove these lines

# Notes

1. in production you won't deploy the default files in `public/` folder unless you have changed/added a key/value in which case you will only include the changed/added keys/values.
