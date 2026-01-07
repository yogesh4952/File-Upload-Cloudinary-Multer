import { Request, Response } from "express";
import { uploadOnCloudinary } from "../utils/cloudinary"; // adjust path as needed

export const fileUpload = async (req: Request, res: Response) => {
  try {
    // 1. Check if Multer actually found a file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded or file type not supported",
      });
    }

    // 2. Call your utility and WAIT for it to finish
    // req.file.path is the 'public/temp/...' path Multer created
    const result = await uploadOnCloudinary(req.file.path);

    // 3. Check if Cloudinary upload was successful
    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload file to Cloudinary",
      });
    }

    // 4. Send the successful response back to React
    return res.status(200).json({
      success: true,
      message: "File uploaded successfully!",
      url: result.secure_url, // This is the link you'll show on the frontend
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
