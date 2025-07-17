import jwt from "jsonwebtoken";
import "dotenv/config";

export const createToken = function (name, email) {
  const token = jwt.sign({ name: name, email: email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const verifyToken = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: `No token provided ` });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
