"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.UserRole = {
    ADMIN: 'admin',
    RENTER: 'renter',
    AGENCY: 'agency'
};
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(exports.UserRole),
        default: exports.UserRole.RENTER, // Set a default role if needed
    },
}, { timestamps: true });
exports.User = mongoose_1.default.model("User", UserSchema);
