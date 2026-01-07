import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { configDotenv } from "dotenv";

configDotenv();

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET_KEY;

if (!api_key || !api_secret) {
  throw new Error("Missing Cloudinary credentials in .env file");
}

cloudinary.config({
  cloud_name: "yogesh",
  api_key: api_key,
  api_secret: api_secret,
});

export const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      use_filename: true,
    });

    // Success!
    console.log("File uploaded on Cloudinary:", response.url);

    // 🔥 ALWAYS remove the local file after upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response; // Return the whole object so you have the URL and the ID
  } catch (error) {
    // 🚨 Remove the local file because the upload failed
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};
