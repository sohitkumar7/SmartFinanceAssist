import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

export const requireAuth = (req, res, next) => {
  ClerkExpressRequireAuth()(req, res, (err) => {
    if (err) {
      console.error("Auth error:", err.status || err.message);
      return res.status(err.status || 401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    next();
  });
};

