import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => res.send("User created"));

userRouter.put("/:id", (req, res) => res.send(`User with ID:  updated`));

userRouter.delete("/:id", (req, res) => res.send(`User with ID:  deleted`));

export default userRouter;
