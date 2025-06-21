import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
    price: { type: String, required: false ,default: false },
    lease_link: { type: String, required: false},
    user_id: { type: String, required:false},
    photos: {type: Array, required: false},
    isDeleted: { type: Boolean, required:false, default: false}
});


ListingSchema.set("timestamps", true);


const Listing = mongoose.model(
    "listing",
    ListingSchema
);

export { Listing };
