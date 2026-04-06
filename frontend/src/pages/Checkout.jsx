import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { cart } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = () => {
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all details");
      return;
    }

    alert("Order placed successfully 🎉");
  };

  return (
    <PageWrapper>
      <div className="bg-black text-white min-h-screen px-8 py-20">

      <h1 className="text-4xl font-bold mb-10">Checkout</h1>

      {/* FORM */}
      <div className="max-w-xl">
        
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-3 text-black"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Address"
          className="w-full mb-4 p-3 text-black"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          type="text"
          placeholder="Phone"
          className="w-full mb-4 p-3 text-black"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <h2 className="text-xl mb-4">Total: ₹{totalPrice}</h2>

        <button
          onClick={handleSubmit}
          className="w-full border py-3 hover:bg-white hover:text-black transition"
        >
          Place Order
        </button>

      </div>

    </div>
    </PageWrapper>
  );
}

export default Checkout;