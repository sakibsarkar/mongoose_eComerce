"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const globalErrorHandler = (errror, req, res, next) => {
    //setting default values
    let message = "Something went wrong!";
    let statusCode = 500;
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (errror instanceof zod_1.ZodError) {
        const simpleErr = (0, handleZodError_1.default)(errror);
        statusCode = simpleErr === null || simpleErr === void 0 ? void 0 : simpleErr.statusCode;
        message = simpleErr === null || simpleErr === void 0 ? void 0 : simpleErr.message;
        errorSources = simpleErr === null || simpleErr === void 0 ? void 0 : simpleErr.errorSources;
    }
    else if ((errror === null || errror === void 0 ? void 0 : errror.name) === "ValidationError") {
        const simpleErr = (0, handleValidationError_1.default)(errror);
        statusCode = simpleErr === null || simpleErr === void 0 ? void 0 : simpleErr.statusCode;
        message = simpleErr === null || simpleErr === void 0 ? void 0 : simpleErr.message;
        errorSources = simpleErr === null || simpleErr === void 0 ? void 0 : simpleErr.errorSources;
    }
    else if ((errror === null || errror === void 0 ? void 0 : errror.name) === "CastError") {
        const simpleErr = (0, handleCastError_1.default)(errror);
        statusCode = simpleErr === null || simpleErr === void 0 ? void 0 : simpleErr.statusCode;
        message = simpleErr === null || simpleErr === void 0 ? void 0 : simpleErr.message;
        errorSources = simpleErr === null || simpleErr === void 0 ? void 0 : simpleErr.errorSources;
    }
    else if ((errror === null || errror === void 0 ? void 0 : errror.code) === 11000) {
        const simpleErr = (0, handleDuplicateError_1.default)(errror);
        statusCode = simpleErr === null || simpleErr === void 0 ? void 0 : simpleErr.statusCode;
        message = simpleErr === null || simpleErr === void 0 ? void 0 : simpleErr.message;
        errorSources = simpleErr === null || simpleErr === void 0 ? void 0 : simpleErr.errorSources;
    }
    else if (errror instanceof AppError_1.default) {
        statusCode = errror === null || errror === void 0 ? void 0 : errror.statusCode;
        message = errror.message;
        errorSources = [
            {
                path: "",
                message: errror === null || errror === void 0 ? void 0 : errror.message,
            },
        ];
    }
    else if (errror instanceof Error) {
        message = errror.message;
        errorSources = [
            {
                path: "",
                message: errror === null || errror === void 0 ? void 0 : errror.message,
            },
        ];
    }
    //ultimate return
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: errror,
        stack: config_1.default.nodeEnv === "development" ? errror === null || errror === void 0 ? void 0 : errror.stack : null,
    });
};
exports.default = globalErrorHandler;
//pattern
/*
success
message
errorSources:[
  path:'',
  message:''
]
stack
*/
