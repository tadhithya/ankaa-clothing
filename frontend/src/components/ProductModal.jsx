import { motion } from "framer-motion";

function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
    >

      {/* MODAL */}
      <motion.div
        onClick={(e) => e.stopPropagation()} // 🔥 prevent close inside
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white text-black max-w-4xl w-full grid md:grid-cols-2 overflow-hidden rounded-lg"
      >

        {/* IMAGE */}
        <div className="overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition duration-500 hover:scale-110"
          />
        </div>

        {/* DETAILS */}
        <div className="p-6 flex flex-col justify-between">

          <div>
            <h2 className="text-3xl font-bold mb-3">
              {product.name}
            </h2>

            <p className="text-gray-600 text-lg mb-6">
              ₹{product.price}
            </p>

            <p className="text-sm text-gray-500">
              Premium quality clothing designed for everyday comfort and style.
            </p>
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="mt-6 border py-2 hover:bg-black hover:text-white transition"
          >
            Close
          </button>

        </div>

      </motion.div>

    </div>
  );
}

export default ProductModal;