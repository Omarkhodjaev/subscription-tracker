import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send("GET all subscription"));

subscriptionRouter.get("/:id", (req, res) =>
  res.send(`get subscriptions details`)
);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) => res.send(`  updated`));

subscriptionRouter.delete("/:id", (req, res) => res.send(`  deleted`));

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send("cancel user's sub")
);

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send("renewals user's sub")
);

export default subscriptionRouter;
