import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  // get the token from the header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // get the user from the token and attach it to the request object
    // the password is not included in the user object for security reasons
    // we send the object data to can use it in the next middlewares or controllers
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
