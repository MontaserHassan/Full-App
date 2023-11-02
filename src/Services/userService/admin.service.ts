import { ObjectId } from "mongoose";

import { Admin, AdminModel } from "../../Models/admin.model";



// ----------------------------- register -----------------------------


const createAdmin = async (adminName: string, phoneNumber: string, email: string, password: string) => {
    const newAdmin: AdminModel = new Admin({
        adminName: adminName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
    });
    await newAdmin.save();
    return newAdmin;
};


// ----------------------------- get admin by email -----------------------------


const getAdminByEmail = async (email: string) => {
    const admin: AdminModel = await Admin.findOne({ email: email });
    return admin;
};



// ----------------------------- get admin by email or phone -----------------------------


const getAdminByEmailOrPhone = async (email: string, phoneNumber: string) => {
    const admin: AdminModel = await Admin.findOne({ $or: [{ email: email }, { phoneNumber: phoneNumber }] });
    return admin;
};


// ----------------------------- verify password -----------------------------


const verifyPassword = async (id: string, password: string) => {
    const admin: AdminModel = await Admin.findById(id);
    const isVerifyPassword = admin.verifyPassword(password);
    return isVerifyPassword;
};


// ----------------------------- update logged -----------------------------


const updateLogged = async (adminId: ObjectId, state: boolean) => {
    const admin = await Admin.findByIdAndUpdate({ _id: adminId }, { logged: state, lastSeen: Date.now() }, { new: true });
    return admin;
};



export default {
    createAdmin,
    getAdminByEmail,
    getAdminByEmailOrPhone,
    verifyPassword,
    updateLogged,
};