import express from "express";
import {
  getAllUser,
  registerUser,
  signinUser,
  viewOneUser,
} from "../controller/authController";
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/sign-in").post(signinUser);
router.route("/view-one-user/:userID").get(viewOneUser);
router.route("/view-all-users").get(getAllUser);
export default router;
