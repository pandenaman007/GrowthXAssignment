const Admin = require('../models/Admin');
const Assignment = require('../models/Assignment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    const { username, password, email } = req.body; 

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword, email });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering admin' });
    }
};


// Login an admin
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

// View assignments for an admin
exports.getAssignments = async (req, res) => {
    const adminId = req.adminId; // Assuming you set adminId in the middleware

    try {
        const assignments = await Assignment.find({ admin: adminId });
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching assignments' });
    }
};

// Accept an assignment
exports.acceptAssignment = async (req, res) => {
    const { id } = req.params;

    try {
        await Assignment.findByIdAndUpdate(id, { status: 'accepted' });
        res.json({ message: 'Assignment accepted' });
    } catch (error) {
        res.status(500).json({ error: 'Error accepting assignment' });
    }
};

// Reject an assignment
exports.rejectAssignment = async (req, res) => {
    const { id } = req.params;

    try {
        await Assignment.findByIdAndUpdate(id, { status: 'rejected' });
        res.json({ message: 'Assignment rejected' });
    } catch (error) {
        res.status(500).json({ error: 'Error rejecting assignment' });
    }
};
// Get all admins
exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find(); // Fetch all admins
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching admins' });
    }
};
