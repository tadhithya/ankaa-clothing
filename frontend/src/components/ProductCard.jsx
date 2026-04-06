import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";

function ProductCard({ id, name, price, image, isAdmin, onEdit }) {
  const navigate = useNavigate();

  // ✅ MUST BE INSIDE COMPONENT
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleDelete = async (e) => {
    e.stopPropagation();
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    window.location.reload();
  };

  return (
    <motion.div
      className="group cursor-pointer"
      style={{ rotateX, rotateY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >

      {/* IMAGE WRAPPER */}
      <div
        className="relative overflow-hidden"
        onClick={() => navigate(`/product/${id}`)}
      >
        <div className="w-full h-64 overflow-hidden rounded-lg">
          <img
            src={image || "https://via.placeholder.com/300"}
            alt={name}
            className="w-full h-60 object-cover"
          />
        </div>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
          <p className="text-white text-lg opacity-0 group-hover:opacity-100 transition">
            View Product
          </p>
        </div>
      </div>

      {/* TEXT */}
      <h2 className="mt-3">{name}</h2>
      <p className="text-gray-400">₹{price}</p>

      {/* ADMIN BUTTONS */}
      {isAdmin && (
        <div className="flex gap-2 mt-2">

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="text-blue-400 border px-3 py-1 hover:bg-blue-500 hover:text-white transition"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="text-red-500 border px-3 py-1 hover:bg-red-500 hover:text-white transition"
          >
            Delete
          </button>

        </div>
      )}

    </motion.div>
  );
}

export default ProductCard;