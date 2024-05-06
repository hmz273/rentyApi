import express from 'express';
import upload from '../multer-config';
import { register, login, logout } from '../controllers/authController';
import { createAgency, getAllAgencies, getAgencyById, updateAgency, deleteAgency } from '../controllers/agencyController';
import { createCar, getAllCars, getCarById, updateCar, deleteCar } from '../controllers/carController';

const router = express.Router();


//Auth
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);

//Admin
router.post('/admin/agencies', upload.array('images', 1), createAgency);
router.get('/admin/agencies', getAllAgencies);
router.get('/admin/agencies/:id', getAgencyById);
router.put('/admin/agencies/:id', upload.array('images', 1), updateAgency);
router.delete('/admin/agencies/:id', deleteAgency);

//Cars
router.post('/admin/cars', upload.array('images', 15), createCar);
router.get('/admin/cars', getAllCars);
router.get('/admin/cars/:id', getCarById);
router.put('/admin/cars/:id', upload.array('images', 15), updateCar);
router.delete('/admin/cars/:id', deleteCar);

export default router;
