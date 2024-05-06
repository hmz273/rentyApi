import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 400, message: "Email already in use" });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({ name, email, password: hashedPassword, role });

        // Respond with the newly created user
        res.status(201).json({ status: 201, message: "User created successfully", user: newUser });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Failed to register user" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // If user not found, return an error
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If passwords don't match, return an error
        if (!isPasswordValid) {
            return res.status(400).json({ status: 400, message: "Invalid password" });
        }

        // Generate a random string of 32 bytes to use as JWT secret key
        const jwtSecret = crypto.randomBytes(32).toString('hex');


        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1d' });

        // Respond with the JWT token
        res.status(200).json({ status: 200, message: "Login successful", token });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Failed to login" });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        // For client-side logout, simply clear the token
        res.clearCookie('token').sendStatus(200);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Failed to logout" });
    }
};
