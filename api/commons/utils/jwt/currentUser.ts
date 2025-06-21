import { Request, Response, NextFunction } from "express";
import HttpException from "../httpException";
import JwtVerify from "./jwtVerify.utils";
import config from "../../../src/appConfig";

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.headers.authorization) {
        res.status(401).send(new HttpException(401, "No User Logged In!"));
    } else {
        try {
            new JwtVerify(config.JWT_KEY).verfyJwtClient(req.headers.authorization, (err: any, payload: any) => {
                if (payload) {
                    // req.currentUser = payload;
                    next();
                } else {
                    res.status(401).send(new HttpException(401, "Not Authorized!"));
                }
            });
        }
        catch (err: any) {
            res.status(401).send(new HttpException(401, "Not Authorized!"));
        }
    }
};
