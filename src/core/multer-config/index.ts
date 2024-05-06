import multer from 'multer';
import path from 'path';

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the directory where uploaded images will be stored
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Generate unique filename for each uploaded image
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// Initialize multer with the configured storage
const upload = multer({ storage });

export default  upload ;
