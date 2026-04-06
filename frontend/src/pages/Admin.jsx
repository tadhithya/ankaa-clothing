import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import EditModal from "../components/EditModal";
import { motion } from "framer-motion";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("all");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const token = localStorage.getItem("token"); // 🔥 ADDED

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ➕ ADD PRODUCT (🔐 TOKEN ADDED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
      category,
      images: [image],
    };

    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // 🔥 ADDED
      },
      body: JSON.stringify(product),
    });

    setName("");
    setPrice("");
    setCategory("men");
    setImage("");

    fetchProducts();
  };

  // 🔍 FILTER + SEARCH
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      category === "all" || p.category === category;

    const matchSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  // 📊 ANALYTICS
  const total = products.length;
  const menCount = products.filter(p => p.category === "men").length;
  const womenCount = products.filter(p => p.category === "women").length;

  const chartData = [
    { name: "Men", value: menCount },
    { name: "Women", value: womenCount },
  ];

  const COLORS = ["#8884d8", "#82ca9d"];

  return (
    <div className="min-h-screen px-6 md:px-12 py-10 bg-black text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Manage your collection
          </p>
        </div>

        {/* 🔐 UPDATED LOGOUT */}
        <button
          onClick={() => {
            localStorage.removeItem("token"); // 🔥 UPDATED
            window.location.href = "/login";
          }}
          className="border px-4 py-2 hover:bg-white hover:text-black transition"
        >
          Logout
        </button>
      </div>

      {/* 📊 ANALYTICS CARDS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >

        <div className="border border-white/10 bg-white/5 backdrop-blur-md p-6 rounded-xl text-center hover:scale-105 transition">
          <p className="text-gray-400 text-sm tracking-wide">Total Products</p>
          <h2 className="text-3xl font-bold mt-2">{total}</h2>
        </div>

        <div className="border border-white/10 bg-white/5 backdrop-blur-md p-6 rounded-xl text-center hover:scale-105 transition">
          <p className="text-gray-400 text-sm tracking-wide">Men</p>
          <h2 className="text-3xl font-bold mt-2">{menCount}</h2>
        </div>

        <div className="border border.white/10 bg-white/5 backdrop-blur-md p-6 rounded-xl text-center hover:scale-105 transition">
          <p className="text-gray-400 text-sm tracking-wide">Women</p>
          <h2 className="text-3xl font-bold mt-2">{womenCount}</h2>
        </div>

      </motion.div>

      {/* 📊 BAR CHART */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-12">
        <h2 className="text-xl font-semibold mb-6">
          Product Distribution
        </h2>

        <div className="w-full h-72">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🥧 PIE CHART */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-12">
        <h2 className="text-xl font-semibold mb-6">
          Category Share
        </h2>

        <div className="w-full h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-4 mb-8">

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 bg-black border border-white/20 rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 bg-black border border-white/20 rounded"
        >
          <option value="all">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>

      </div>

      {/* ADD PRODUCT */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 grid md:grid-cols-4 gap-4 mb-10"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 bg-black border border-white/20 rounded"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 bg-black border border-white/20 rounded"
          required
        />

        <select
          value={category === "all" ? "men" : category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 bg-black border border-white/20 rounded"
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>

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
          className="p-2 bg-black border border-white/20 rounded col-span-4"
        />

        {image && image !== "loading" && (
          <img src={image} className="h-24 col-span-4 object-cover" />
        )}

        {image === "loading" && (
          <p className="text-gray-400 col-span-4">Uploading...</p>
        )}

        <button className="col-span-4 border py-2 hover:bg-white hover:text-black transition">
          Add Product
        </button>
      </form>

      {/* PRODUCTS */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((item) => (
          <ProductCard
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            category={item.category}
            image={item.images?.[0]}
            isAdmin={true}
            onEdit={() => setSelectedProduct(item)}
          />
        ))}
      </div>

      {/* EDIT MODAL */}
      {selectedProduct && (
        <EditModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdate={fetchProducts}
        />
      )}

    </div>
  );
}

export default Admin;