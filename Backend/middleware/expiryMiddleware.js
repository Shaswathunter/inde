const expiryMiddleware = (req, res, next) => {
  const expiryDate = new Date(process.env.APP_EXPIRY);

  if (new Date() > expiryDate) {
    return res.status(403).json({
      success: false,
      message: "Application Expired",
    });
  }

  next();
};

export default expiryMiddleware;