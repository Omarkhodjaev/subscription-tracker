import { Router } from "express";
import {
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", (req, res) => res.send(`User with ID:  deleted`));

export default userRouter;
