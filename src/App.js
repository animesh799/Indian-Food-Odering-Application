import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartContextProvider from "./components/store/cartContextProvider";

function App() {
  const [cartState, setCartIsshown] = useState(false);

  function showCartHandler() {
    setCartIsshown(true);
  }

  function hideCartHandler() {
    setCartIsshown(false);
  }

  return (
    <CartContextProvider>
      {cartState && <Cart onCloseCart={hideCartHandler}></Cart>}
      <Header onShowCart={showCartHandler}></Header >
      <main>
        <Meals></Meals>
      </main>
    </CartContextProvider>
  );
}

export default App;
