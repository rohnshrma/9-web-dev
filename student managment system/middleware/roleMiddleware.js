export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // TODO: Check if logged-in user role exists in allowedRoles
    // TODO: Return forbidden response or redirect if unauthorized
    next();
  };
};
