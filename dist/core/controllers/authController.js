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
exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        // Check if the email already exists in the database
        const existingUser = yield user_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 400, message: "Email already in use" });
        }
        // Hash the password before saving it
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create a new user
        const newUser = yield user_1.User.create({ name, email, password: hashedPassword, role });
        // Respond with the newly created user
        res.status(201).json({ status: 201, message: "User created successfully", user: newUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Failed to register user" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = yield user_1.User.findOne({ email });
        // If user not found, return an error
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        // If passwords don't match, return an error
        if (!isPasswordValid) {
            return res.status(400).json({ status: 400, message: "Invalid password" });
        }
        // Generate a random string of 32 bytes to use as JWT secret key
        const jwtSecret = crypto_1.default.randomBytes(32).toString('hex');
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, jwtSecret, { expiresIn: '1d' });
        // Respond with the JWT token
        res.status(200).json({ status: 200, message: "Login successful", token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Failed to login" });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // For client-side logout, simply clear the token
        res.clearCookie('token').sendStatus(200);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Failed to logout" });
    }
});
exports.logout = logout;
