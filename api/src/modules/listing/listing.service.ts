import { User } from "../../../commons/models";
import { CrudOperations, Password } from "../../../commons/utils";
import { JwtGenerator } from "../../../commons/utils";
import config from "../../appConfig";
import { Listing } from "../../../commons/models";
import { LLM } from "../../../commons/utils";
import { ListingTrivia } from "../../../commons/models/listingTrivia.entity";

class ListingService {
    public async addListing(listing: any, next: CallableFunction) {
        try {
            const listingResult = await new CrudOperations(Listing).save(listing);
            if (listingResult) {
                new LLM("image/jpeg",listing.lease_link).loadLLMData(listingResult._id)
                
                return next(null, listingResult);
            }
            else {
                return next(null, "Error getting user.");
            }
        } catch (error) {
            console.log("addListing error: " + error);
        }
    }

    public async deleteListing(query: any, next: CallableFunction) {
        try {
            const listingResult = await new CrudOperations(Listing).updateDocument(query, {isDeleted:true})
            if (listingResult) {
                return next(null, listingResult);
            }
            else {
                return next(null, "Error deleting user.");
            }
        } catch (error) {
            console.log("deleteListing error: " + error);
        }
    }
    
    public async viewListings(query: any, next: CallableFunction) {
        try {
            if (query.myListings == "true"){ // view my Listing
                const myListings = await new CrudOperations(Listing).getAllDocuments({user_id: query.user_id, "isDeleted":false},{}, { pageNo: 0, limit: 0 })
                return next(null, myListings);
            }
            else { // view all listings except mine.
                const allListings = await new CrudOperations(Listing).getAllDocuments({ user_id: { $nin: [query.user_id] },  "isDeleted":false }, {}, { pageNo: 0, limit: 0 });
                return next(null, allListings);
            }

        } catch (error) {
            console.log("viewListings error: " + error);
        }
    }

    public async viewListingTrivia(query: any, next: CallableFunction) {
        try {//query = {id: ""}
            if (query.id){ // view my Listing
                const myListings = await new CrudOperations(ListingTrivia).getDocument({listing_id: query.id, "isDeleted":false},{})
                return next(null, myListings);
            }
            else { // view all listings except mine.
               return next(null, "Error viewing listing trivia.");
            }

        } catch (error) {
            console.log("viewListings error: " + error);
        }
    }

}

export default new ListingService();