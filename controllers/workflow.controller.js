import { createRequire } from "module";
import dayjs from "dayjs";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/send-email.js";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (ctx) => {
  const { subscriptionId } = ctx.requestPayload;

  const subscription = await fetchSubscription(ctx, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription: ${subscriptionId}. Stopping workflow.`
    );
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        ctx,
        `Reminder ${daysBefore} days before`,
        reminderDate
      );
    }

    if (dayjs().isSame(reminderDate, "day")) {
      await triggerReminder(
        ctx,
        `${daysBefore} days before reminder`,
        subscription
      );
    }
  }
});

const fetchSubscription = async (ctx, subscriptionId) => {
  return await ctx.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);

    await sendReminderEmail({
      to: subscription.user,
      type: label,
      subscription,
    });
  });
};
