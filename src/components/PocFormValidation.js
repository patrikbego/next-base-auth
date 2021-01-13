import React, {useState, useEffect, useRef} from 'react';

const PocFormValidation = () => {
  // we use the help of useRef to test if it's the first render
  const firstRender = useRef(true);

  // set a state variable which can be used to disable the save/submit button
  // we set it to true so that the form is disabled on first render
  const [disable, setDisabled] = useState(true);

  // we can also set error messages to display to the user
  const [nameError, setNameError] = useState(null);

  // set initial state value(s) for example:
  const [nameLabel, setNameLabel] = useState('');

  // for every change in our state this will be fired
  // we add validation here and disable the save button if required
  useEffect(() => {

    // we want to skip validation on first render
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // here we can disable/enable the save button by wrapping the setState function
    // in a call to the validation function which returns true/false
    setDisabled(formValidation());

  }, [name]); // any state variable(s) included in here will trigger the effect to run

  // here we run any validation, returning true/false
  const formValidation = () => {
    if (name === '') {
      setNameError('Name cant be blank!');
      return true;
    } else {
      setNameError(null);
      return false;
    }
  };

  const handleSave = () => {
    // ...
  };

  return (
      <form onSubmit={handleSave}>
        <input
            type="text"
            name="nameLabel"
            value={nameLabel}
            onChange={e => setNameLabel(e.target.value)}
        />
        {nameError && <p>{nameError}</p>}
        <button type="submit" disabled={disable}>Save</button>
      </form>
  );
};

export default PocFormValidation;
