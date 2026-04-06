import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const totalPrice = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

  return (
    <PageWrapper>
    <div className="bg-black text-white min-h-screen px-8 py-20">

      <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center border-b py-4">

            <div>
              <h2>{item.name}</h2>
              <p>Size: {item.size}</p>
              <p>₹{item.price}</p>
            </div>

            {/* Quantity */}
            <div className="flex gap-3 items-center">
              <button onClick={() => updateQuantity(item.id, item.size, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.size, 1)}>+</button>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(item.id, item.size)}
              className="text-red-500"
            >
              Remove
            </button>
            {/* TOTAL */}
<div className="mt-10 text-right">
  <h2 className="text-2xl font-bold">
    Total: ₹{totalPrice}
  </h2>

  <button
    onClick={() => window.location.href = "/checkout"}
    className="mt-4 px-6 py-3 border hover:bg-white hover:text-black transition"
  >
    Proceed to Checkout
  </button>
</div>

          </div>
        ))
      )}

    </div>
    </PageWrapper>
  );
}

export default Cart;