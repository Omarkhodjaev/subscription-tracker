import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {

    const decision = await aj.protect(req, { requested: 1 });

    // if (decision.isDenied()) {
    //   if (decision.reason.isRateLimit()) {
    //     return res.status(429).json({
    //       error: "Rate limit exceeded. Please try again later.",
    //     });
    //   }

    //   if (decision.reason.isBot()) {
    //     return res.status(403).json({
    //       error: "Bot detected. Access denied.",
    //     });
    //   }

    //   return res.status(403).json({
    //     error: "Access denied.",
    //   });
    // }
    next();
  } catch (error) {
    console.log("Arcjet Middleware Error:", error);
    next(error);
  }
};

export default arcjetMiddleware;
