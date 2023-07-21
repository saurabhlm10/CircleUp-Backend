"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = void 0;
const responseObject = {
    success: false,
    message: "",
};
const googleLogin = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        responseObject.message = "Token Missing";
        return res.status(401).json(responseObject);
    }
    try {
        // const decode = jwt.verify(token, process.env.SECRET!) as GoogleProfile;
        // const decode = demixStrings(token, "1");
        const decode = token;
        console.log("DECODE", decode);
        req.user = decode;
        return next();
    }
    catch (error) {
        if (error instanceof Error) {
            responseObject.message = "Token Invalid";
            res.status(401).json(responseObject);
        }
    }
};
exports.googleLogin = googleLogin;
