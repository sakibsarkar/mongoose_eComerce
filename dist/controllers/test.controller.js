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
exports.getTestData = exports.testController = void 0;
const fs_1 = __importDefault(require("fs"));
const testController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Hello tester");
});
exports.testController = testController;
const getTestData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const readStream = fs_1.default.createReadStream(process.cwd() + "/data/index.html");
    readStream.pipe(res);
    readStream.on("error", (err) => {
        console.error("Error reading file:", err);
        res.status(500).send("Internal Server Error");
    });
    readStream.on("end", () => {
        console.log("Streaming finished");
    });
});
exports.getTestData = getTestData;
