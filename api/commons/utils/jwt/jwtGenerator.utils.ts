import jwt from 'jsonwebtoken';
//import config from "../../appConfig";

class JwtGenerator {
    private jwtKey: string;

    constructor(jwtKey: string) {
        this.jwtKey = jwtKey;
    }

    public generateJwt(userid: string, email: string): string {
        const payload = {
            id: userid,
            email: email,
        };

        const signoptions: jwt.SignOptions = {
            issuer: "lease-ease",
            subject: userid.toString(),
            algorithm: "HS256",
        };

        const token = jwt.sign(
            payload,
            this.jwtKey,
            signoptions
        );

        return token;
    }

}

export default JwtGenerator;
