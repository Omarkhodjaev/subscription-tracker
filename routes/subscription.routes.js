import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send("GET all subscription"));

subscriptionRouter.get("/:id", (req, res) =>
  res.send(`get subscriptions details`)
);

subscriptionRouter.post("/", (req, res) => res.send("create subscript"));

subscriptionRouter.put("/:id", (req, res) => res.send(`  updated`));

subscriptionRouter.delete("/:id", (req, res) => res.send(`  deleted`));

subscriptionRouter.get("/user/:id", (req, res) => res.send("get user's sub"));

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send("cancel user's sub")
);

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send("renewals user's sub")
);

export default subscriptionRouter;
