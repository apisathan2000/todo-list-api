import jwt from "jsonwebtoken";
import "dotenv/config";

export const createToken = function (name, email) {
  const token = jwt.sign({ name: name, email: email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const verifyToken = async function () {};
