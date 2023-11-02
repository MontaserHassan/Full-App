import mongoose from "mongoose";
import bcrypt from "bcrypt";

import Role from "../Interfaces/role.interface";



interface AdminModel extends mongoose.Document {
    adminName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: Role.ADMIN;
    isBlocked: boolean;
    lastSeen: Date;
    logged: boolean;
    verifyPassword(password: string): Boolean;
};

const AdminSchema = new mongoose.Schema(
    {
        adminName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: Role.ADMIN,
        },
        lastSeen: {
            type: Date,
        },
        logged: {
            type: Boolean,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
            },
        },
    },
);


AdminSchema.pre('save', function preSave(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

AdminSchema.methods.verifyPassword = function verifyPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
};


const Admin = mongoose.model<AdminModel>('admin', AdminSchema);



export {
    Admin,
    AdminModel,
};