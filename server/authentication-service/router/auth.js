import express from "express";
import { signInUser, signOutUser, signUpUser } from "../controllers/auth.js";

const router = express.Router()

router.post("/signup",signUpUser)

router.post("/signIn",signInUser)

router.get("/signOut",signOutUser)

export default router