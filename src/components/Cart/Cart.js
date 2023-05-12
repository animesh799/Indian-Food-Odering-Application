import Modal from "../UI/Modal";
import react from "react";
import classes from "./Cart.module.css";
import CartContext from "../store/cart-context";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const totalamount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const [isCheckingOut, setCheckingOut] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  const onRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const onAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={onRemoveHandler.bind(null, item.id)}
          onAdd={onAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const checkouthandler = () => {
    setCheckingOut(true);
  };

  const onConfirmHandler = async (userData) => {
    setSubmitting(true);
    await fetch(
      "https://foodapp-3e2ba-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userdata: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setSubmitting(false);
    setSubmitted(true);
    cartCtx.clearCart();
  };

  const modalContent = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkouthandler}>
          Order
        </button>
      )}
    </div>
  );

  const SubmittingContent = <p>Submitting your order.......</p>;

  const SubmittedContent = (
    <react.Fragment>
      <p>Your order submitted sucessfully</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </react.Fragment>
  );
  const cartModalContent = (
    <react.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalamount}</span>
      </div>
      {isCheckingOut && (
        <Checkout onCancel={props.onCloseCart} onConfirm={onConfirmHandler} />
      )}
      {!isCheckingOut && modalContent}
    </react.Fragment>
  );

  return (
    <Modal onClick={props.onCloseCart}>
      {!isSubmitted && !isSubmitting && cartModalContent}
      {!isSubmitted && isSubmitting && SubmittingContent}
      {isSubmitted && SubmittedContent}
    </Modal>
  );
}

export default Cart;
