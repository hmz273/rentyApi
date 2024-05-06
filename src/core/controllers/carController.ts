import { Request, Response } from 'express';
import { Car } from '../models/carModel';

// Create new Car
export const createCar = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const images = (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => file.path);
        const existingCar = await Car.findOne({ name });
        if (existingCar) {
            return res.status(400).json({ status: 400, message: "Car already in use" });
        }
        const newCar = new Car({
            name,
            images,
        });
        await newCar.save();
        res.status(201).json({ message: 'Car created successfully', car: newCar });
    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({ error: 'Failed to create car' });
    }
};

// Update car by ID
export const updateCar = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const images = (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => file.path);
        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id,
            { name, images },
            { new: true }
        );
        if (!updatedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.status(200).json({ message: 'Car updated successfully', car: updatedCar });
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({ error: 'Failed to update car' });
    }
};

// Get all Car
export const getAllCars = async (req: Request, res: Response) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
};

// Get Car by ID
export const getCarById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ error: 'car not found' });
        }
        res.json(car);
    } catch (error) {
        console.error('Error fetching car by ID:', error);
        res.status(500).json({ error: 'Failed to fetch car' });
    }
};

// Delete Car by ID
export const deleteCar = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedCar = await Car.findByIdAndDelete(id);
        if (!deletedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error('Error deleting Car:', error);
        res.status(500).json({ error: 'Failed to delete Car' });
    }
};
