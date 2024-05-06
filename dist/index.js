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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./core/routes/authRoutes"));
// Create the express app and  import the type of app from express;
const app = (0, express_1.default)();
// Cors
app.use((0, cors_1.default)());
//configure env;
dotenv_1.default.config();
// Parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
// Routes
app.use('/api', authRoutes_1.default);
// Declare The PORT Like This
const PORT = 8000;
app.get("/", (req, res) => {
    res.send("<h1>Welcome</h1>");
});
// Listen the server
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🗄️  Server Fire on http:localhost:${PORT}`);
    // Connect To The Database
    try {
        yield mongoose_1.default.connect(process.env.DATABASE_URL);
        console.log("🛢️  Connected To Database");
    }
    catch (error) {
        console.log("⚠️ Error to connect Database");
    }
}));
