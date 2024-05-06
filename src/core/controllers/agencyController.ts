import { Request, Response } from 'express';
import { Agency } from '../models/agencyModel';

// Create new agency
export const createAgency = async (req: Request, res: Response) => {
    try {
        const { name, location } = req.body;
        const logo = (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => file.path);

        // Check if the agency already exists in the database
        const existingAgency = await Agency.findOne({ name });
        if (existingAgency) {
            return res.status(400).json({ status: 400, message: "Agency already in use" });
        }

        const agency = new Agency({ name, location, logo });
        const savedAgency = await agency.save();
        res.status(201).json(savedAgency);
    } catch (error) {
        console.error('Error creating agency:', error);
        res.status(500).json({ error: 'Failed to create agency' });
    }
};

// Update agency by ID
export const updateAgency = async (req: Request, res: Response) => {
    try {
        const { name, location } = req.body;
        const logo = (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => file.path);
        
        // Check if the agency already exists in the database
        const existingAgency = await Agency.findOne({ name });
        if (existingAgency) {
            return res.status(400).json({ status: 400, message: "Agency already in use" });
        }

        const updatedCar = await Agency.findByIdAndUpdate(
            req.params.id,
            { name, location, logo },
            { new: true }
        );
        if (!updatedCar) {
            return res.status(404).json({ error: 'Agency not found' });
        }
        res.status(200).json({ message: 'Agency updated successfully', car: updatedCar });
    } catch (error) {
        console.error('Error updating Agency:', error);
        res.status(500).json({ error: 'Failed to update Agency' });
    }
};

// Get all agencies
export const getAllAgencies = async (req: Request, res: Response) => {
    try {
        const agencies = await Agency.find();
        res.json(agencies);
    } catch (error) {
        console.error('Error fetching agencies:', error);
        res.status(500).json({ error: 'Failed to fetch agencies' });
    }
};

// Get agency by ID
export const getAgencyById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const agency = await Agency.findById(id);
        if (!agency) {
            return res.status(404).json({ error: 'Agency not found' });
        }
        res.json(agency);
    } catch (error) {
        console.error('Error fetching agency by ID:', error);
        res.status(500).json({ error: 'Failed to fetch agency' });
    }
};

// Delete agency by ID
export const deleteAgency = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedAgency = await Agency.findByIdAndDelete(id);
        if (!deletedAgency) {
            return res.status(404).json({ error: 'Agency not found' });
        }
        res.json({ message: 'Agency deleted successfully' });
    } catch (error) {
        console.error('Error deleting agency:', error);
        res.status(500).json({ error: 'Failed to delete agency' });
    }
};
