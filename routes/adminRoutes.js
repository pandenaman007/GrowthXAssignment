const express = require('express');
const {
    register,
    login,
    getAssignments,
    acceptAssignment,
    rejectAssignment,
    getAdmins
} = require('../controllers/adminController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Register a new admin
router.post('/register', register);

// Admin login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create JWT
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Get assignments for the logged-in admin
router.get('/assignments', auth, getAssignments);

// Accept an assignment by ID
router.post('/assignments/:id/accept', auth, acceptAssignment);

// Reject an assignment by ID
router.post('/assignments/:id/reject', auth, rejectAssignment);

// Fetch all admins
router.get('/admins', getAdmins);

module.exports = router;
