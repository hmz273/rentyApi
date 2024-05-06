"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_config_1 = __importDefault(require("../multer-config"));
const authController_1 = require("../controllers/authController");
const agencyController_1 = require("../controllers/agencyController");
const carController_1 = require("../controllers/carController");
const router = express_1.default.Router();
//Auth
router.post('/auth/register', authController_1.register);
router.post('/auth/login', authController_1.login);
router.post('/auth/logout', authController_1.logout);
//Admin
router.post('/admin/agencies', multer_config_1.default.array('images', 1), agencyController_1.createAgency);
router.get('/admin/agencies', agencyController_1.getAllAgencies);
router.get('/admin/agencies/:id', agencyController_1.getAgencyById);
router.put('/admin/agencies/:id', multer_config_1.default.array('images', 1), agencyController_1.updateAgency);
router.delete('/admin/agencies/:id', agencyController_1.deleteAgency);
//Cars
router.post('/admin/cars', multer_config_1.default.array('images', 15), carController_1.createCar);
router.get('/admin/cars', carController_1.getAllCars);
router.get('/admin/cars/:id', carController_1.getCarById);
router.put('/admin/cars/:id', multer_config_1.default.array('images', 15), carController_1.updateCar);
router.delete('/admin/cars/:id', carController_1.deleteCar);
exports.default = router;
