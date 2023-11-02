import Joi from 'joi';


const adminAuthValidator = {
    registerAdmin: {
        body: Joi.object().keys({
            adminName: Joi.string().required().trim().min(8).max(25),
            email: Joi.string().required().trim().email().message('Please enter a valid email.'),
            phoneNumber: Joi.string().required().length(11).trim().regex(/^(011|012|015|010)\d{8}$/).messages({
                'string.length': 'Phone number must be 11 characters long.',
                'string.pattern.base': 'Please enter a valid phone number starting with 011, 012, 015, or 010, followed by 8 digits.',
                'any.required': 'Phone number is required.',
            }),
            password: Joi.string().required().min(8).max(20).regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$~%?^&*_.\-=+])[A-Za-z\d!?@#$~%^&*_.\-=+]{8,20}$/).message('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!?@#$~%^&*_.\\-=+).'),
        }),
    },
    // loginAdmin: {
    //     body: Joi.object().keys({
    //         email: Joi.string().required().email().message('Please enter a valid email.').trim(),
    //         password: Joi.string().required(),
    //     }),
    // },
};



export {
    adminAuthValidator,
};