import express from "express";
import {
  deleteTask,
  getAllTasks,
  postTask,
  updateTask,
} from "../controllers/taskController.js";
import { verifyToken } from "../middleware/jwt.js";
import { validateBody } from "../middleware/validateBody.js";
import { taskSchema, updateTaskSchema } from "../schema/taskSchema.js";

const router = express.Router();

router.get("/all", verifyToken, getAllTasks);
router.post("/create", verifyToken, validateBody(taskSchema), postTask);
router.patch(
  "/update/:id",
  verifyToken,
  validateBody(updateTaskSchema),
  updateTask
);

router.delete("/delete/:id", verifyToken, deleteTask);

export default router;
