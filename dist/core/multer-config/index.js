"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Set up multer storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Specify the directory where uploaded images will be stored
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Generate unique filename for each uploaded image
        const ext = path_1.default.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
// Initialize multer with the configured storage
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
