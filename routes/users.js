import express from 'express';
import { signin,signup,staffForm,doctersForm,patientForm } from "../controllers/users.js";



const router= express.Router()


router.post('/signin',signin);
router.post('/signup',signup);

// Route for registering a doctor
router.post('/register/doctor',doctersForm );

// Route for registering staff
router.post('/register/staff', staffForm);

// Route for registering a patient
router.post('/register/patient', patientForm);



export default router;