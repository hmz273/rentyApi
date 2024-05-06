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
exports.deleteAgency = exports.getAgencyById = exports.getAllAgencies = exports.updateAgency = exports.createAgency = void 0;
const agencyModel_1 = require("../models/agencyModel");
// Create new agency
const createAgency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, location } = req.body;
        const logo = req.files.map((file) => file.path);
        // Check if the agency already exists in the database
        const existingAgency = yield agencyModel_1.Agency.findOne({ name });
        if (existingAgency) {
            return res.status(400).json({ status: 400, message: "Agency already in use" });
        }
        const agency = new agencyModel_1.Agency({ name, location, logo });
        const savedAgency = yield agency.save();
        res.status(201).json(savedAgency);
    }
    catch (error) {
        console.error('Error creating agency:', error);
        res.status(500).json({ error: 'Failed to create agency' });
    }
});
exports.createAgency = createAgency;
// Update agency by ID
const updateAgency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, location } = req.body;
        const logo = req.files.map((file) => file.path);
        // Check if the agency already exists in the database
        const existingAgency = yield agencyModel_1.Agency.findOne({ name });
        if (existingAgency) {
            return res.status(400).json({ status: 400, message: "Agency already in use" });
        }
        const updatedCar = yield agencyModel_1.Agency.findByIdAndUpdate(req.params.id, { name, location, logo }, { new: true });
        if (!updatedCar) {
            return res.status(404).json({ error: 'Agency not found' });
        }
        res.status(200).json({ message: 'Agency updated successfully', car: updatedCar });
    }
    catch (error) {
        console.error('Error updating Agency:', error);
        res.status(500).json({ error: 'Failed to update Agency' });
    }
});
exports.updateAgency = updateAgency;
// Get all agencies
const getAllAgencies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const agencies = yield agencyModel_1.Agency.find();
        res.json(agencies);
    }
    catch (error) {
        console.error('Error fetching agencies:', error);
        res.status(500).json({ error: 'Failed to fetch agencies' });
    }
});
exports.getAllAgencies = getAllAgencies;
// Get agency by ID
const getAgencyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const agency = yield agencyModel_1.Agency.findById(id);
        if (!agency) {
            return res.status(404).json({ error: 'Agency not found' });
        }
        res.json(agency);
    }
    catch (error) {
        console.error('Error fetching agency by ID:', error);
        res.status(500).json({ error: 'Failed to fetch agency' });
    }
});
exports.getAgencyById = getAgencyById;
// Delete agency by ID
const deleteAgency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedAgency = yield agencyModel_1.Agency.findByIdAndDelete(id);
        if (!deletedAgency) {
            return res.status(404).json({ error: 'Agency not found' });
        }
        res.json({ message: 'Agency deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting agency:', error);
        res.status(500).json({ error: 'Failed to delete agency' });
    }
});
exports.deleteAgency = deleteAgency;
