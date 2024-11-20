const express = require('express');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
      folder: 'uploads', // Folder name in Cloudinary
      public_id: (req, file) => `${Date.now()}-${file.originalname}` // Use a unique identifier for the file
  }
});



const upload = multer({ storage: storage });

// Define the route for creating a doctor
router.route('/create-doctor').post(upload.single('image'), doctorController.createDoctor);
router.route('/doctors').get(doctorController.getDoctors);
router.route('/doctor/:id').get(doctorController.getDoctor);
router.route('/:doctorId').patch(doctorController.editDoctor)



router.route('/radio').get(doctorController.getRadio,doctorController.getDoctors);
router.route('/cardio').get(doctorController.getCardio,doctorController.getDoctors);
router.route('/pedia').get(doctorController.getPedio,doctorController.getDoctors);
router.route('/general').get(doctorController.getGeneral,doctorController.getDoctors);
router.route('/neuro').get(doctorController.getNeuro,doctorController.getDoctors);
router.route('/oncologist').get(doctorController.oncologist,doctorController.getDoctors);
router.route('/gynecolo').get(doctorController.gynecolo,doctorController.getDoctors);
module.exports = router;
