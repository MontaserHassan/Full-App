const generateOTP = () => {
    const otpGenerated = Math.floor(Math.random() * 900000) + 100000;
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 3);
    return { OTP: otpGenerated, expirationDate: expirationDate };
};



export default generateOTP;