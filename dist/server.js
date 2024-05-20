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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const port = process.env.PORT || 5000;
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(`mongodb+srv://${config_1.default.dbUser}:${config_1.default.dbPass}@cluster0.xbiw867.mongodb.net/${config_1.default.dbName}`);
    server = app_1.default.listen(port, () => {
        console.log(`SERVER IS RUNNING ON ${port}`);
    });
});
startServer();
