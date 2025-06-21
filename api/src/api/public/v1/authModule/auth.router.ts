import { Router } from "express";
import UserController from "./auth.controller";


const router = Router();

router.post("/signUp", UserController.signUp);

router.post("/signIn", UserController.signIn);

router.get("/getUser/:id", UserController.getUser);

export default router;