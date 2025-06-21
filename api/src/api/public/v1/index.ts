import { Router } from "express";

import UserRoutes from "./authModule/auth.router";

const router = Router();

router.use("/auth", UserRoutes);

export default router;

