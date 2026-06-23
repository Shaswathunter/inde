const expiryMiddleware = (req, res, next) => {
  if (process.env.APP_ACTIVE !== "true") {
    return res.status(403).json({
      success: false,
      message: "DEPLOYMENT_NOT_FOUND",
    });
  }

  next();
};

export default expiryMiddleware;