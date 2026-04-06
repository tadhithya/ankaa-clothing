import Product from "../models/Product.js";

// GET
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// ADD
export const addProduct = async (req, res) => {
  const product = new Product(req.body);
  const created = await product.save();
  res.json(created);
};

// DELETE
export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// ✅ UPDATE (IMPORTANT)
export const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};