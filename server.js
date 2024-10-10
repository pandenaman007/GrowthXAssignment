require('dotenv').config();  // This must be the first line
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/backend', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// Routes
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
