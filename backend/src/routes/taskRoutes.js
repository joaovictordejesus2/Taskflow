// João Victor de Jesus Augusto PD015
import { Router } from "express";
import { createTask, listTasks, updateTask, deleteTask } from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, listTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
