// Import JWT library to verify incoming access tokens.
import jwt, { decode } from "jsonwebtoken";

// Middleware: validates Bearer token and attaches decoded user payload to req.user.
const authMiddleware = async (req, res, next) => {
  // Guard middleware with try/catch to capture token parsing/verification errors.
  try {
    // Read Authorization header (expected format: "Bearer <token>").
    var token = req.headers.authorization;

    // If header is missing, reject request as unauthorized.
    if (!token) {
      return res.status(401).json({
        message: "No Token Provided",
        status: "Failed",
      });
    }

    // Split "Bearer <token>" by space and keep actual token value.
    token = token.split(" ")[1];
    // Log extracted token for debugging (remove in production for security/log hygiene).
    console.log("TOKEN => ", token);

    // Verify signature and expiry using secret; throws if invalid/expired.
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "helloworld");

    // Attach decoded payload (e.g., user id) so downstream handlers can authorize/query by user.
    req.user = decoded;

    // Pass control to next middleware/route handler.
    next();
  } catch (err) {
    // Token errors return 401 Unauthorized with error detail.
    return res.status(401).json({
      message: `Invalid Token : ${err.message}`,
    });
  }
};

// Export middleware for use in protected routes.
export default authMiddleware;

// Example Bearer token string used during testing/debugging:
// ("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMTAxZGQwMmI3YTQwZjQwZjhmYzU1NyIsImlhdCI6MTc3OTQ0MTE1MSwiZXhwIjoxNzgwMDQ1OTUxfQ.t2KabyWvb-j68dV2T0YtWlVYBC7xTT6Br-9yeX3hc4A");
