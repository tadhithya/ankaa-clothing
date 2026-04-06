import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import ProductModal from "../components/ProductModal";

function Products() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const categoryFromURL = queryParams.get("category");

  const [filter, setFilter] = useState(categoryFromURL || "all");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilter(categoryFromURL || "all");
  }, [categoryFromURL]);

  const items = products.map((p) => ({
    id: p._id,
    name: p.name,
    price: p.price,
    category: p.category,
    image: p.images[0],
  }));

  const filteredItems =
    filter === "all"
      ? items
      : items.filter((item) => item.category === filter);

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen px-8 py-20">

      <h1 className="text-4xl font-bold mb-10 text-center">
        Our Collection
      </h1>

      <div className="flex justify-center gap-6 mb-10">
        <button onClick={() => setFilter("all")} className="border px-4 py-2">All</button>
        <button onClick={() => setFilter("men")} className="border px-4 py-2">Men</button>
        <button onClick={() => setFilter("women")} className="border px-4 py-2">Women</button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {loading
          ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : filteredItems.map((item) => (
              <div onClick={() => setSelectedProduct(item)}>
                <ProductCard {...item} isAdmin={false} />
              </div>
            ))}
      </div>

    </div>
  );
}

export default Products;