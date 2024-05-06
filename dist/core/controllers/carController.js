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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.getCarById = exports.getAllCars = exports.updateCar = exports.createCar = void 0;
const carModel_1 = require("../models/carModel");
// Create new Car
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const images = req.files.map((file) => file.path);
        const existingCar = yield carModel_1.Car.findOne({ name });
        if (existingCar) {
            return res.status(400).json({ status: 400, message: "Car already in use" });
        }
        const newCar = new carModel_1.Car({
            name,
            images,
        });
        yield newCar.save();
        res.status(201).json({ message: 'Car created successfully', car: newCar });
    }
    catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({ error: 'Failed to create car' });
    }
});
exports.createCar = createCar;
// Update car by ID
const updateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const images = req.files.map((file) => file.path);
        const updatedCar = yield carModel_1.Car.findByIdAndUpdate(req.params.id, { name, images }, { new: true });
        if (!updatedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.status(200).json({ message: 'Car updated successfully', car: updatedCar });
    }
    catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({ error: 'Failed to update car' });
    }
});
exports.updateCar = updateCar;
// Get all Car
const getAllCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cars = yield carModel_1.Car.find();
        res.json(cars);
    }
    catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
});
exports.getAllCars = getAllCars;
// Get Car by ID
const getCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const car = yield carModel_1.Car.findById(id);
        if (!car) {
            return res.status(404).json({ error: 'car not found' });
        }
        res.json(car);
    }
    catch (error) {
        console.error('Error fetching car by ID:', error);
        res.status(500).json({ error: 'Failed to fetch car' });
    }
});
exports.getCarById = getCarById;
// Delete Car by ID
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedCar = yield carModel_1.Car.findByIdAndDelete(id);
        if (!deletedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json({ message: 'Car deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting Car:', error);
        res.status(500).json({ error: 'Failed to delete Car' });
    }
});
exports.deleteCar = deleteCar;
