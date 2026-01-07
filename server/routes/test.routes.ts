import express from "express";
import { fileUpload } from "../controller/test.controller";
import { upload } from "../middleware/multer";
const Router = express.Router();

Router.post("/upload", upload.single("image"), fileUpload);

export default Router;
