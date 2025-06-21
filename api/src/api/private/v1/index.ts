import { Router } from "express";

import ListingRoutes from "./listing/listing.router";

const router = Router();

router.use("/listing", ListingRoutes);

export default router;

