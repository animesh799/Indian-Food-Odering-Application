import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../store/cart-context";
import { useContext } from "react";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const ctxCart = useContext(CartContext);

  const onAddtoCartHandler = (amount) => {
    
    ctxCart.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm
          id={props.id}
          OnaddItemtoCart={onAddtoCartHandler}
        ></MealItemForm>
      </div>
    </li>
  );
};

export default MealItem;
