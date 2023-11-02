import { NextFunction, Request, Response } from "express";

import { adminService } from "../../Services/index.service";
import { errorAdminMessage } from "../../Messages/index.message";
import { successAdminMessage } from "../../Messages/index.message";
import CustomError from "../../Utils/customError.util";
import { createToken } from "../../Utils/index.util";



// ----------------------------- register -----------------------------


const registerAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { adminName, phoneNumber, email, password } = req.body;
        const checkExistingEmail = await adminService.getAdminByEmailOrPhone(email, phoneNumber);
        if (checkExistingEmail && checkExistingEmail.email === email) {
            throw new CustomError(errorAdminMessage.emailExists, 406, "email");
        } else if (checkExistingEmail && checkExistingEmail.phoneNumber === phoneNumber) {
            throw new CustomError(errorAdminMessage.phoneNumberExists, 406, "phoneNumber");
        };
        const newAdmin = await adminService.createAdmin(adminName, phoneNumber, email, password);
        if (!newAdmin) throw new CustomError(errorAdminMessage.doesNotCreated, 404, "admin");
        res.status(201).send({ admin: newAdmin, message: successAdminMessage.created });
    } catch (err) {
        next(err);
    };
};


// ----------------------------- login -----------------------------


const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const admin = await adminService.getAdminByEmail(email);
        if (!admin) throw new CustomError(errorAdminMessage.notFoundAdmin, 404, "admin");
        const isVerifyPassword = await adminService.verifyPassword(admin._id, password);
        if (!isVerifyPassword) throw new CustomError(errorAdminMessage.wrongPassword, 404, "admin");
        const token = createToken(admin, String(process.env.EXPIRESIN));
        await adminService.updateLogged(admin._id, true);
        res.status(200).send({ admin: admin, message: successAdminMessage.login, token: token });
    } catch (err) {
        next(err);
    };
};


// ----------------------------- logout -----------------------------


const logoutAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const admin = await adminService.updateLogged(userId, false);
        if (!admin) throw new CustomError(errorAdminMessage.notFoundAdmin, 404, "admin");
        res.status(200).send({ admin: admin, message: successAdminMessage.logout });
    } catch (err) {
        next(err)
    };
};



export default {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
};