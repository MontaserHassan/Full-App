import { ObjectId } from "mongoose";

import { Role } from "./index.interface";



interface UserInterface {
    userId: ObjectId;
    userRole: Role;
};



export default UserInterface;