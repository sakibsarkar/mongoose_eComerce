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
exports.authorizeRoles = exports.isAuthenticatedUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../Modules/user/user.model");
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const isAuthenticatedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getToken = req.header("Authorization");
        if (!getToken)
            return res.status(400).json({ msg: "Invalid Authentication." });
        const token = getToken.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        if (!decoded)
            return res.status(400).json({ msg: "Invalid Authentication." });
        const user = yield user_model_1.User.findOne({ _id: decoded === null || decoded === void 0 ? void 0 : decoded._id }).select("-password");
        if (!user)
            return res.status(400).json({ msg: "User does not exist." });
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});
exports.isAuthenticatedUser = isAuthenticatedUser;
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        var _a;
        if (!roles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.user_type)) {
            throw new AppError_1.default(403, "Forbiden access");
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
