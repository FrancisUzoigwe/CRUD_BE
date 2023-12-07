import { Application, Request, Response } from "express";
import product from "./router/productRouter";
import auth from "./router/authRouter";

export const mainApp = (app: Application) => {
  app.use("/api", product);
  app.use("/api", auth);
  try {
    app.get("/", async (req: Request, res: Response): Promise<Response> => {
      try {
        return res.status(200).json({
          message: "Welcome to sales API",
        });
      } catch (error) {
        return res.status(404).json({
          message: "Error",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
