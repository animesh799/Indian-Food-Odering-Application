import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const Checkout = (props) => {
  const isEmpty = (value) => value.trim() === "";
  const isFiveChar = (value) => value.trim().length === 5;
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const [inputValidity, setInputValidity] = useState({
    name: true,
    street: true,
    postalcode: true,
    city: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const postalCodeIsValid = isFiveChar(enteredPostalCode);
    const cityIsValid = !isEmpty(enteredCity);
    setInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      postalcode: postalCodeIsValid,
      city: cityIsValid,
    });
    const formIsValid =
      nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;
    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      Name: enteredName,
      Street: enteredStreet,
      PostalCode: enteredPostalCode,
      City: enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          inputValidity.name ? "" : classes.invalid
        } `}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!inputValidity.name && <p>ENTER A VALID NAME</p>}
      </div>
      <div
        className={`${classes.control} ${
          inputValidity.street ? "" : classes.invalid
        } `}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!inputValidity.street && <p>ENTER A VALID STREET</p>}
      </div>
      <div
        className={`${classes.control} ${
          inputValidity.postalcode ? "" : classes.invalid
        } `}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!inputValidity.postalcode && <p>ENTER A VALID POSTAL CODE</p>}
      </div>
      <div
        className={`${classes.control} ${
          inputValidity.city ? "" : classes.invalid
        } `}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!inputValidity.city && <p>ENTER A VALID CITY</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
