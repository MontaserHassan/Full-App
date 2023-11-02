import { ObjectId } from "mongoose";
import { Customer, CustomerModel } from "../../Models/customer.model";



// ----------------------------- create customer -----------------------------


const createCustomer = async (customerName: string, email: string, phoneNumber: string, password: string) => {
    const newCustomer: CustomerModel = new Customer({
        customerName: customerName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
    });
    await newCustomer.save();
    return newCustomer;
};


// ----------------------------- get customer by email -----------------------------


const getCustomerByEmail = async (email: string) => {
    const customer: CustomerModel = await Customer.findOne({ email: email });
    return customer;
};


// ----------------------------- get customer by email -----------------------------


const getCustomerByEmailOrPhone = async (email: string, phoneNumber: string) => {
    const customer: CustomerModel = await Customer.findOne({ $or: [{ email: email }, { phoneNumber: phoneNumber }] });
    return customer;
};


// ----------------------------- update customer -----------------------------


const updateCustomer = async (customerId: ObjectId, customerName: string, email: string, phoneNumber: string,) => {
    const updatedCustomer: CustomerModel = await Customer.findByIdAndUpdate({ _id: customerId }, {
        customerName: customerName,
        email: email,
        phoneNumber: phoneNumber,
    }, { new: true });
    return updatedCustomer;
};


// ----------------------------- update customer -----------------------------


const updateCustomerPassword = async (id: ObjectId, newPassword: string) => {
    const updatedCustomer: CustomerModel = await Customer.findById(id);
    updatedCustomer.password = newPassword;
    await updatedCustomer.save();
    return updatedCustomer;
};


// ----------------------------- verify password -----------------------------


const verifyPassword = async (id: string, password: string) => {
    const customer: CustomerModel = await Customer.findById(id);
    const isVerifyPassword = customer.verifyPassword(password);
    return isVerifyPassword;
};



// ----------------------------- update logged -----------------------------


const updateLogged = async (customerId: ObjectId, state: boolean) => {
    const admin = await Customer.findByIdAndUpdate({ _id: customerId }, { logged: state, lastSeen: Date.now() }, { new: true });
    return admin;
};



export default {
    createCustomer,
    getCustomerByEmail,
    getCustomerByEmailOrPhone,
    updateCustomer,
    updateCustomerPassword,
    verifyPassword,
    updateLogged,
};