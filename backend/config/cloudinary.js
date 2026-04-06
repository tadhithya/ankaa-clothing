import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // ✅ IMPORTANT

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// 🔥 DEBUG
console.log("Cloudinary Config:");
console.log("Cloud:", process.env.CLOUD_NAME);
console.log("Key:", process.env.API_KEY);

export default cloudinary;