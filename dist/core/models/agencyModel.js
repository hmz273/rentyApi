"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agency = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AgencySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    images: {
        type: [Buffer], // Array of image buffers
        required: true,
    },
}, { timestamps: true });
exports.Agency = mongoose_1.default.model("Agency", AgencySchema);
