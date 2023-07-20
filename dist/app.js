"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const homeRoute_1 = __importDefault(require("./routes/homeRoute"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const followRoutes_1 = __importDefault(require("./routes/followRoutes"));
const auth_1 = require("./middleware/auth");
const app = (0, express_1.default)();
(0, db_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/api", homeRoute_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/profile", auth_1.auth, profileRoutes_1.default);
app.use("/api/post", auth_1.auth, postRoutes_1.default);
app.use("/api/follow", auth_1.auth, followRoutes_1.default);
exports.default = app;
