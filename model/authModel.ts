import mongoose from "mongoose";

interface iUser {
  userName: string;
  email: string;
  password: string;
  cart: {}[];
}

interface iUserData extends iUser, mongoose.Document {}
const authModel = new mongoose.Schema(
  {
    userName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cart: 
      {
        type: Array<{}>,
        
      },
   
  },
  { timestamps: true }
);

export default mongoose.model<iUserData>("users", authModel);
