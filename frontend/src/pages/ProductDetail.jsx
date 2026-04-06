import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-8 py-20"
    >

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 border px-4 py-2"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <motion.img
          src={product.images[0]}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="w-full h-[500px] object-cover"
        />

        {/* INFO */}
        <div className="flex flex-col justify-center">

          <h1 className="text-4xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-400 mb-4">
            {product.category}
          </p>

          <p className="text-2xl mb-6">
            ₹{product.price}
          </p>

          <p className="text-gray-500">
            Premium quality clothing designed for modern lifestyle.
          </p>

        </div>

      </div>

    </motion.div>
  );
}

export default ProductDetail;