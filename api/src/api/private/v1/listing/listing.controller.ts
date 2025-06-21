import { Request, Response, NextFunction } from "express";
import { HttpException, HttpResponse, Password } from "../../../../../commons/utils";
import ListingService from "../../../../modules/listing/listing.service";

class UserController {

    public async addListing(request: Request, response: Response, next: NextFunction) {
        try {
          let listing = request.body;
          ListingService.addListing(listing, (err: any, result: any) => {
            if (err) {
              return next(new HttpException(400, err));
            } else {
              response.status(200).send(new HttpResponse("addListing", result, null, null, null, null));
            }
          });
        }
        catch (err) {
          console.log("addListing error.");
        }
      }
    
    public async deleteListing(request: Request, response: Response, next: NextFunction) {
      try {
        // // console.log("A:",request.query);
        // let id = request.query.id
        ListingService.deleteListing(request.query, (err: any, result: any) => {
          if (err) {
            return next(new HttpException(400, err));
          } else {
            response.status(200).send(new HttpResponse("deleteListing", result, null, null, null, null));
          }
        });
      }
      catch (err) {
        console.log("deleteListing error.");
      }
    }

    public async viewListings(request: Request, response: Response, next: NextFunction) {
      try {
        
        ListingService.viewListings(request.query, (err: any, result: any) => {
          if (err) {
            return next(new HttpException(400, err));
          } else {
            response.status(200).send(new HttpResponse("viewListings", result, null, null, null, null));
          }
        });
      }
      catch (err) {
        console.log("viewListings error.");
      }
    }

    public async viewListingTrivia(request: Request, response: Response, next: NextFunction) {
      try {
        
        ListingService.viewListingTrivia(request.query, (err: any, result: any) => {
          if (err) {
            return next(new HttpException(400, err));
          } else {
            response.status(200).send(new HttpResponse("viewListingTrivia", result, null, null, null, null));
          }
        });
      }
      catch (err) {
        console.log("viewListingTrivia error.");
      }
    }

}

export default new UserController();