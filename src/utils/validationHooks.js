import { useState } from "react";

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        console.log(event.value)
        console.log(event.target.value)
        setValue(event.target.value + 123);
      }
    }
  };
};

export const useValidation = initialValue => {
  const [value, setValue, phoneError, setPhoneError] = useState(initialValue);

  return {
    value,
    setValue,
    phoneError,
    setPhoneError,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        if (event.target.name === 'phone') {
          console.log(event.target.value)
          setValue(event.target.value);
          if (event.target && event.target.value && event.target.value.match(
              '/^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/'))
            setPhoneError('Not a valid phone number!')
        }
      }
    }
  };
};
