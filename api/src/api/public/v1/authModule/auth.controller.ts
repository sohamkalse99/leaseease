import { Request, Response, NextFunction } from "express";
import { HttpException, HttpResponse, Password } from "../../../../../commons/utils";
import UserService from "../../../../modules/authModule/user.service";

class UserController {

  public async signUp(request: Request, response: Response, next: NextFunction) {
    try {
      let user = request.body;
      user.password = await Password.toHash(user.password);
      UserService.signUp(user, (err: any, result: any) => {
        if (err) {
          return next(new HttpException(400, err));
        } else {
          response.status(200).send(new HttpResponse("signUp", result, null, null, null, null));
        }
      });
    }
    catch (err) {
      console.log("SignUp error.");
    }
  }

  public async signIn(request: Request, response: Response, next: NextFunction) {
    try {
      let user = request.body;
      UserService.signIn(user, (err: any, result: any) => {
        if (err) {
          return next(new HttpException(400, err));
        }
        else {
          return response.status(200).send(new HttpResponse("signIn", result, null, null, null, null));
        }
      })
    }
    catch (err) {
      console.log("SignIn error.");
    }
  }
  
  public async getUser(request: Request, response: Response, next: NextFunction) {
    try {
      let userId = request.params.id;
      UserService.getUser(userId, (err: any, result: any) => {
        if (err) {
          return next(new HttpException(400, err));
        }
        else {
          response.status(200).send(new HttpResponse("getUser", result, null, null, null, null));
        }
      })

    } catch (error) {
      console.log("Error in getUser", error);
    }
  }

}

export default new UserController();

