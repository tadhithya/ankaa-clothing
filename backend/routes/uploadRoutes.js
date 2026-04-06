import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.any(), async (req, res) => {
  try {
    console.log(req.files); // 🔥 DEBUG

    const file = req.files[0]; // get first file

    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = "data:" + file.mimetype + ";base64," + b64;

    const result = await cloudinary.uploader.upload(dataURI);

    res.json({ url: result.secure_url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;