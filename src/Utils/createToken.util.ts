import jwt from 'jsonwebtoken';

import { AdminModel } from '../Models/admin.model';
import { CustomerModel } from '../Models/customer.model';
import calculateExpirationDate from './calculateExpirationDate';



// -------------------------------------------- create token --------------------------------------------


function createToken(user: AdminModel | CustomerModel, expiresIn: string) {
    const expireDate = calculateExpirationDate(expiresIn);
    const expiresInMilliseconds = Math.floor((expireDate.getTime() - new Date().getTime()) / 1000);
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: expiresInMilliseconds });
    return token;
};



export default createToken;