import { Request, Response } from "express";

export const fileUpload = (req: Request, res: Response) => {
  try {
    console.log(req.file);
  } catch (error) {
    console.log(error);
  }
};
