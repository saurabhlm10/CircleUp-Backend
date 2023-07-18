"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRemoveFollower = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const mongoose_1 = require("mongoose");
const removeFromFollowersList = (userEmail, foreignUserEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const removeFromFollowersListResponse = yield UserModel_1.default.findOneAndUpdate({ email: foreignUserEmail }, { $pull: { followers: userEmail } }, {
        new: true,
    });
    return removeFromFollowersListResponse;
});
const removeFromFollowingList = (userEmail, foreignUserEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const removeFromFollowingListResponse = (yield UserModel_1.default.findOneAndUpdate({ email: userEmail }, { $pull: { following: foreignUserEmail } }, {
        new: true,
    }));
    return removeFromFollowingListResponse;
});
const addToFollowersList = (userEmail, foreignUserEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const addToFollowersListResponse = (yield UserModel_1.default.findOneAndUpdate({ email: foreignUserEmail }, { $addToSet: { followers: userEmail } }, {
        new: true,
    }));
    return addToFollowersListResponse;
});
const addToFollowingList = (userEmail, foreignUserEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const addToFollowingListResponse = (yield UserModel_1.default.findOneAndUpdate({ email: userEmail }, { $addToSet: { following: foreignUserEmail } }, {
        new: true,
    }));
    return addToFollowingListResponse;
});
const responseObject = {
    success: false,
    message: "",
    foreignUser: {},
    user: {},
};
const addRemoveFollower = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail, foreignUserEmail } = req.params;
        if (!(userEmail && foreignUserEmail)) {
            responseObject.message = "All fields are required";
            return res.status(401).json(responseObject);
        }
        if (userEmail === foreignUserEmail) {
            responseObject.message = "Cannot follow self";
            return res.status(401).json(responseObject);
        }
        const user = (yield UserModel_1.default.findOne({
            email: userEmail,
        }));
        if (!user) {
            responseObject.message = "user doesn't exist";
            return res.status(401).json(responseObject);
        }
        const foreignUser = (yield UserModel_1.default.findOne({
            email: foreignUserEmail,
        }));
        if (!foreignUser) {
            responseObject.message = "foreignUser doesn't exist";
            return res.status(401).json(responseObject);
        }
        if (foreignUser.followers.includes(userEmail)) {
            const removedFollower = removeFromFollowersList(userEmail, foreignUserEmail);
            const removedFollowing = removeFromFollowingList(userEmail, foreignUserEmail);
            const [removeFromFollowersListResponse, removeFromFollowingListResponse] = yield Promise.all([removedFollower, removedFollowing]);
            responseObject.message = "Removed Follower";
            responseObject.success = true;
            responseObject.user = removeFromFollowersListResponse;
            responseObject.foreignUser = removeFromFollowingListResponse;
            return res.status(200).json(responseObject);
        }
        const addedFollower = addToFollowersList(userEmail, foreignUserEmail);
        const addedFollowing = addToFollowingList(userEmail, foreignUserEmail);
        const [addToFollowersListResponse, addToFollowingListResponse] = yield Promise.all([addedFollower, addedFollowing]);
        responseObject.message = "Added Follower";
        responseObject.success = true;
        responseObject.user = addToFollowersListResponse;
        responseObject.foreignUser = addToFollowingListResponse;
        return res.status(200).json(responseObject);
    }
    catch (error) {
        console.log(error);
        responseObject.user = {};
        responseObject.foreignUser = {};
        if (error instanceof mongoose_1.MongooseError) {
            responseObject.message =
                error.name === "CastError" ? "Invalid followersArray" : error.message;
            return res.status(401).json(responseObject);
        }
        if (error instanceof Error) {
            responseObject.message = error.message;
            return res.status(500).json(responseObject);
        }
    }
});
exports.addRemoveFollower = addRemoveFollower;
