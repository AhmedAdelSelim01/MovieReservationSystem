export default function isAdmin(req, res, next) {
  // Check if user exists and has admin role
  // Note: This middleware requires the protect middleware to run first
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Not authorized, please login first" });
  }

  if (req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({ message: "Access denied. Admins only." });
}
