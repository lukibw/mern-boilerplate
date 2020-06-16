module.exports = (req, res, next) => {
  if (!req.user) {
    return res.json({ message: "Unauthorized" });
  }
  return next();
};
