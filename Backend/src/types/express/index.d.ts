import { UserProfile } from "../../models/technology.modal"
declare global{
    namespace Express {
        interface Request {
            user : UserProfile|null,
            token  : String
        }
    }
}