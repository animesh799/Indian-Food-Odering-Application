import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";
import { useRef,useState } from "react";

const MealItemForm = (props) => {
  const [amountIsValid,setAmountIsValid]=useState(true)
  const amountRef = useRef();
  function onSubmitHandler(event) {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredNumberedAmount=+enteredAmount
    

    if (
      enteredAmount.trim().length === 0 ||
      enteredNumberedAmount < 1 ||
      enteredNumberedAmount > 5
    ) {
      setAmountIsValid(false)
      return;
    }
    
    props.OnaddItemtoCart(enteredNumberedAmount);
  }

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+Add</button>
      {!amountIsValid&&<p>Enter valid amount b/w 1-5</p>}
    </form>
  );
};

export default MealItemForm;
