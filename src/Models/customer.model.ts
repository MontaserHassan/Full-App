import mongoose from "mongoose";
import bcrypt from "bcrypt";

import Role from "../Interfaces/role.interface";



interface CustomerModel extends mongoose.Document {
    customerName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: Role.USER;
    isBlocked: boolean;
    unlockLoginTime: Date;
    failedLoginAttempts: number;
    lastSeen: Date;
    logged: boolean;
    verifyPassword(password: string): Boolean;
};

const customerSchema = new mongoose.Schema(
    {
        customerName: {
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
            default: Role.USER,
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
        unlockLoginTime: {
            type: Date,
        },
        failedLoginAttempts: {
            type: Number,
            default: 0,
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


customerSchema.pre('save', function preSave(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

customerSchema.methods.verifyPassword = function verifyPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
};


const Customer = mongoose.model<CustomerModel>('customer', customerSchema);



export {
    Customer,
    CustomerModel,
};