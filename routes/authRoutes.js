import express from "express";

import {
  createUser,
  loginUser,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { registerSchema, loginSchema } from "../schema/authSchema.js";
import { validateBody } from "../middleware/validateBody.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), createUser);
router.post("/login", validateBody(loginSchema), loginUser);

export default router;
