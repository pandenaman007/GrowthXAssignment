// models/Admin.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true } // Add email field
});

module.exports = mongoose.model('Admin', AdminSchema);
