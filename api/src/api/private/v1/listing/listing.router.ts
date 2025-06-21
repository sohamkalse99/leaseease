import { Router } from "express";
import ListingController from "./listing.controller";


const router = Router();

router.post("/addListing", ListingController.addListing);

router.delete("/deleteListing", ListingController.deleteListing);

router.get("/viewListings", ListingController.viewListings);

router.get("/viewListingTrivia", ListingController.viewListingTrivia);

export default router;