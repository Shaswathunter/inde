import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// 🔥 Proper v2 config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "activation_screenshots",
      allowed_formats: ["jpg", "png", "jpeg"],
      resource_type: "image",
    };
  },
});

const upload = multer({ storage });

console.log("Cloud:", process.env.CLOUD_NAME);
console.log("Key:", process.env.API_KEY ? "EXISTS" : "MISSING");
export default upload;