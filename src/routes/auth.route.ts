import express from "express";
import { login, signup } from "../controllers/auth.controller";
import { validateLoginPayload, validateSignupPayload, validateUsernameIfUnique } from "../middleware/auth-validation";

const router = express.Router();

router.post("/signup", validateSignupPayload, validateUsernameIfUnique, signup);
router.post("/login", validateLoginPayload, login);

export default router;
