import { Request, Response } from "express";
import bcrypt from "bcrypt";
import authModel from "../model/authModel";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, userName } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const auth = await authModel.create({ email, password: hashed, userName });
    return res.status(201).json({
      message: "User registered successfully",
      data: auth,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: " Error occured while registering user",
      data: error?.message,
    });
  }
};

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authModel.findOne({ email });
    if (user) {
      const checked = await bcrypt.compare(password, user?.password!);
      if (checked) {
        return res.status(200).json({
          message: `Welcome back ${user?.userName}`,
          data: user,
        });
      } else {
        return res.status(400).json({
          message: "Error occured while signin in",
        });
      }
    } else {
      return res.status(401).json({
        message: "user not found",
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: " User not found",
      data: error?.message,
    });
  }
};

export const viewOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await authModel.findById(userID);
    return res.status(200).json({
      message: `View ${user?.userName} account`,
      data: user,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "Error occured while viewing one user",
      data: error?.message,
    });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await authModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Viewing all users on the platform",
      data: users,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while getting all users",
      data: error?.message,
    });
  }
};
