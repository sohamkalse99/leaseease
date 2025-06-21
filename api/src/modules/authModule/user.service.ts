import { User } from "../../../commons/models";
import { CrudOperations, Password } from "../../../commons/utils";
import { JwtGenerator } from "../../../commons/utils";
import config from "../../appConfig";

class UserService {
    public async signUp(user: any, next: CallableFunction) {
        try {
            let userDetails = await new CrudOperations(User).getDocument({ email: user.email }, {});
            if (userDetails) {
                return next(null, "User already Exist. Please log in.")
            }
            else {
                let savedUser = await new CrudOperations(User).save(user);
                return next(null, savedUser);
            }
        }
        catch (err) {
            next("SignUp error.")
        }
    }

    public async signIn(user: any, next: CallableFunction) {
        try {
            let userDetails = await new CrudOperations(User).getDocument({ email: user.email }, {});
            if (!userDetails) {
                return next(null, "No user found with email.")
            }
            else if (userDetails && !(await Password.compare(userDetails.password, user.password))) {
                return next(null, "Wrong password.")
            }
            else {
                let token = await new JwtGenerator(config.JWT_KEY).generateJwt(userDetails.id, userDetails.email)
                userDetails = {...userDetails._doc, "token":token};
                return next(null, userDetails);
            }
        }
        catch (err) {
            next("SignIn error.")
        }
    }

    public async getUser(userId: any, next: CallableFunction) {
        try {

            const userDetails = await new CrudOperations(User).getDocument({ _id: userId }, {});
            if (userDetails) {
                return next(null, userDetails);
            }
            else {
                return next(null, "Error getting user.");
            }
        } catch (error) {
            console.log("getUser error: " + error);
        }
    }

}

export default new UserService();
