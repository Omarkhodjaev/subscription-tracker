import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send("User endpoint hit"));

userRouter.get("/:id", (req, res) => res.send(`User with ID:  hit`));

userRouter.post("/", (req, res) => res.send("User created"));

userRouter.put("/:id", (req, res) => res.send(`User with ID:  updated`));

userRouter.delete("/:id", (req, res) => res.send(`User with ID:  deleted`));


export default userRouter;
