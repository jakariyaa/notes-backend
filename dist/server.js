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
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
let server;
const port = process.env.PORT || 3000;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { connection } = yield mongoose_1.default.connect(process.env.MONGO_URI || "");
            console.log("Connected to MongoDB:", connection.host);
            server = app_1.default.listen(port, () => console.log(`Server running on port ${port}`));
        }
        catch (error) {
            console.log("Error starting server: \n", error);
        }
    });
}
bootstrap();
