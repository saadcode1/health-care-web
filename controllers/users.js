import User from '../model/user.js'; // Assuming a Mongoose model
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Patient from '../model/patient.js';
import Doctor from '../model/docter.js';
import Staff from '../model/Staff.js';

const JWT_SECRET = 'your_jwt_secret'; // You should store this in an environment variable for security

// SignIn Controller
export const signin = async (req, res) => {
    const { email, password } = req.body;
    console.log("-----------------", req.body);

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log('user-not-found')
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the password matches
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        // Send token and user info back
        res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role, name: user.name } });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
};

// SignUp Controller
export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(req.body);

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });

        // Send token and user info back
        res.status(201).json({ token, user: { id: newUser._id, email: newUser.email, role: newUser.role, name: newUser.name } });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
};




export const doctersForm=async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).send(doctor);
    } catch (error) {
        res.status(400).send(error);
    }
}


export const staffForm=async (req, res) => {
    try {
        const staff = new Staff(req.body);
        await staff.save();
        res.status(201).send(staff);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const patientForm=async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).send(patient);
    } catch (error) {
        res.status(400).send(error);
    }
}
