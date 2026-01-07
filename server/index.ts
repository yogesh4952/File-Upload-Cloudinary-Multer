import express, { Request, Response, urlencoded } from "express";
import cors from "cors";
import Router from "./routes/test.routes";

const app = express();

app.use(urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("I am live");
});

app.use("", Router);

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
