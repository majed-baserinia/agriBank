````
  const [val, setVal] = useState("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal((event.target as HTMLInputElement).value);
  };



 <RadioGroup
        name="test"
        value={val}
        onChange={handleRadioChange}
      >
        <RadioButtonAdapter
          value="1"
          label="1"
          onChange={handleRadioChange}
          checked={val == "1"}
        />
        <RadioButtonAdapter
          value="2"
          label="2"
          onChange={handleRadioChange}
          checked={val == "2"}
        />
</RadioGroup>

      ```
````
