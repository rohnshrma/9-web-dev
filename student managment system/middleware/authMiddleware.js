export const isAuthenticated = (req, res, next) => {
  // TODO: Check whether user is authenticated
  // TODO: Redirect unauthenticated users to login page
  next();
};

export const isGuest = (req, res, next) => {
  // TODO: Restrict authenticated users from visiting auth pages
  next();
};
