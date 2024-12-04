const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const playerRoutes = require('./routes/player');
const adminRoutes = require('./routes/admin');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/user', authRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
