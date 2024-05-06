"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CarSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    images: {
        type: [Buffer], // Array of image buffers
        required: true,
    },
}, { timestamps: true });
exports.Car = mongoose_1.default.model("Car", CarSchema);
