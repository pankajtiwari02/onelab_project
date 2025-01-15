import express from "express";
import {
  deleteUserById,
  findUserById,
  getAllUsers,
  updateUserById,
} from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validUser } from "../middlewares/validUser.js";

const router = express.Router();

router.get("/allUsers", getAllUsers);

router.get("/:id", findUserById);

router.put("/:id", updateUserById);

router.delete("/:id", verifyToken, validUser, deleteUserById);

export default router;
