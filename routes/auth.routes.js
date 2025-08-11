import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import {
  signInUserValidation,
  signUpUserValidation,
} from "../validations/user.validation.js";
import authorize from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", validateMiddleware(signUpUserValidation), signUp);

authRouter.post("/sign-in", validateMiddleware(signInUserValidation), signIn);

authRouter.post("/sign-out", authorize, signOut);

export default authRouter;
