import { useState } from "react";
import { motion } from "framer-motion";

function EditModal({ product, onClose, onUpdate }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [image, setImage] = useState(product.images?.[0]);

  const handleUpdate = async () => {
    await fetch(`http://localhost:5000/api/products/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        category,
        images: [image],
      }),
    });

    onUpdate();
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // 🔥 click outside to close
    >

      {/* MODAL BOX */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} // 🔥 prevent close on click inside
        className="bg-black/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl w-full max-w-md shadow-2xl"
      >

        <h2 className="text-xl mb-4 font-semibold">Edit Product</h2>

        <div className="space-y-3">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-black border border-white/20 rounded"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 bg-black border border-white/20 rounded"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 bg-black border border-white/20 rounded"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            onChange={async (e) => {
              const file = e.target.files[0];
              setImage("loading");

              const formData = new FormData();
              formData.append("image", file);

              const res = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
              });

              const data = await res.json();
              setImage(data.url);
            }}
            className="w-full p-2 border border-white/20 rounded"
          />

          {image && image !== "loading" && (
            <img src={image} className="h-24 object-cover rounded" />
          )}

          {image === "loading" && (
            <p className="text-gray-400">Uploading...</p>
          )}

        </div>

        <div className="flex gap-3 mt-5">

          <button
            onClick={handleUpdate}
            className="flex-1 border py-2 rounded hover:bg-white hover:text-black transition"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="flex-1 border py-2 rounded text-red-400 hover:bg-red-500 hover:text-white transition"
          >
            Cancel
          </button>

        </div>

      </motion.div>
    </motion.div>
  );
}

export default EditModal;