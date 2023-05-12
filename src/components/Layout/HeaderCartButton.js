import classses from "./HeaderCartButton.module.css";
import { useContext,useEffect,useState } from "react";
import CartContext from "../store/cart-context";

import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  const[buttonIsHighlighted,setBtnIsHighlighted]=useState(false)
  const cartCtx=useContext(CartContext)
const {items}=cartCtx
  useEffect(()=>{
    if(items.length===0){
      return
    }
    setBtnIsHighlighted(true)

    const timer=setTimeout(()=>{
      setBtnIsHighlighted(false)
    },300)

    return ()=>{
      clearTimeout(timer)
    }

  },[items])
// console.log(cartCtx.items)
const buttonClasses=`${classses.button}  ${buttonIsHighlighted?classses.bump:""}`


  const noOfCartItems=cartCtx.items.reduce((currntNo,item)=>{
    return currntNo+item.amount;
  },0)
  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classses.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={classses.badge}>{noOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
