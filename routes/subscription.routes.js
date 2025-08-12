import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  cancelUserSubscription,
  createSubscription,
  deleteSubscription,
  getSubscription,
  getSubscriptions,
  getUpcomingRenewals,
  getUserSubscriptions,
  updateSubscription,
} from "../controllers/subscription.controller.js";
import {
  createSubscriptionValidation,
  updateSubscriptionValidation,
} from "../validations/subscription.validation.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getSubscriptions);

subscriptionRouter.get("/upcoming-renewals", authorize, getUpcomingRenewals);

subscriptionRouter.get("/:id", getSubscription);

subscriptionRouter.post(
  "/",
  authorize,
  validateMiddleware(createSubscriptionValidation),
  createSubscription
);

subscriptionRouter.put(
  "/:id",
  authorize,
  validateMiddleware(updateSubscriptionValidation),
  updateSubscription
);

subscriptionRouter.delete("/:id", authorize, deleteSubscription);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", authorize, cancelUserSubscription);

export default subscriptionRouter;
