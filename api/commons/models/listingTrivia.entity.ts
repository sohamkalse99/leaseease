import mongoose from "mongoose";

const ListingTriviaSchema = new mongoose.Schema({
    property_addr: { type: String, required: false ,default: false },
    owner: { type: String, required: false},
    tenants: { type: String, required:false},
    tourist_places: {type: Array, required: false},
    restaurant_places: {type: Array, required: false},
    grocery: {type: Array, required: false},
    listing_id: {type:  String, required:false},
    isDeleted: { type: Boolean, required:false, default: false}
});


ListingTriviaSchema.set("timestamps", true);


const ListingTrivia = mongoose.model(
    "listingtrivia",
    ListingTriviaSchema
);

export { ListingTrivia };
