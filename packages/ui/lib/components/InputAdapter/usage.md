```

<Controller
    name="test"
    render=({field})={
      return (
        <InputAdapter
              label={"test"}
              onChange={field.onChange}
              helperText="tesetskdjslk;g"
              size="lg"
              success
              type="password"
              icon={<ArrowBack/>}
            />
      )
    }
/>

```

## onChange

the onChange props returns the value
