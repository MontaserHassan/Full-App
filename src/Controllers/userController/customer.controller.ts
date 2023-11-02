import { NextFunction, Request, Response } from "express";

import { customerService } from "../../Services/index.service";
import { errorCustomerMessage, successCustomerMessage } from "../../Messages/index.message";
import CustomError from "../../Utils/customError.util";
import {createToken} from "../../Utils/index.util";



// ----------------------------- register -----------------------------


const registerCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const { customerName, phoneNumber, email, password } = req.body;
    try {
        const checkExistingEmail = await customerService.getCustomerByEmailOrPhone(email, phoneNumber);
        if (checkExistingEmail && checkExistingEmail.email === email) {
            throw new CustomError(errorCustomerMessage.emailExists, 406, "email");
        } else if (checkExistingEmail && checkExistingEmail.phoneNumber === phoneNumber) {
            throw new CustomError(errorCustomerMessage.phoneNumberExists, 406, "phoneNumber");
        };
        const newCustomer = await customerService.createCustomer(customerName, phoneNumber, email, password);
        const token = createToken(newCustomer, String(process.env.EXPIRESIN));
        await customerService.updateLogged(newCustomer._id, true);
        res.status(201).send({ message: successCustomerMessage.created, customer: newCustomer, token: token });
    } catch (err) {
        next(err);
    };
};


// ----------------------------- login -----------------------------


const loginCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const customer = await customerService.getCustomerByEmail(email);
        if (!customer) throw new CustomError(errorCustomerMessage.notFoundCustomer, 404, "customer");
        const isVerifyPassword = await customerService.verifyPassword(customer._id, password);
        if (!isVerifyPassword) throw new CustomError(errorCustomerMessage.wrongPassword, 404, "customer");
        const token = createToken(customer, String(process.env.EXPIRESIN));
        await customerService.updateLogged(customer._id, true);
        res.status(200).send({ customer: customer, message: successCustomerMessage.login, token: token });
    } catch (err) {
        next(err);
    };
};


// ----------------------------- logout -----------------------------


const logoutCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const customer = await customerService.updateLogged(userId, false);
        if (!customer) throw new CustomError(errorCustomerMessage.notFoundCustomer, 404, "customer");
        res.status(200).send({ customer: customer, message: successCustomerMessage.logout });
    } catch (err) {
        next(err)
    };
};


// ----------------------------- update customer -----------------------------


const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { customerName, email, phoneNumber } = req.body;
        const customer = await customerService.updateCustomer(userId, customerName, email, phoneNumber);
        if (!customer) throw new CustomError(errorCustomerMessage.notUpdated, 404, "customer");
        res.status(200).send({ customer: customer, message: successCustomerMessage.updated });
    } catch (err) {
        next(err)
    };
};


// ----------------------------- update customer password -----------------------------


const updateCustomerPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { newPassword } = req.body;
        const customer = await customerService.updateCustomerPassword(userId, newPassword);
        if (!customer) throw new CustomError(errorCustomerMessage.notUpdated, 404, "customer");
        res.status(200).send({ customer: customer, message: successCustomerMessage.updatedPassword });
    } catch (err) {
        next(err)
    };
};

export default {
    registerCustomer,
    loginCustomer,
    logoutCustomer,
    updateCustomer,
    updateCustomerPassword,
};