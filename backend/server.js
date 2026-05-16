require('dotenv').config();

const express = require('express');

const cors = require('cors');

const connectDB = require('./config/db');

const authRoutes =
require('./routes/authRoutes');

const app = express();

// CONECTAR DB

connectDB();

// MIDDLEWARES

app.use(cors());

app.use(express.json());

// ROUTES

app.use('/api/auth', authRoutes);

app.use('/api/appointments', appointmentRoutes);

// SERVER

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Servidor rodando na porta ${PORT}`
    );

});

const appointmentRoutes =
require('./routes/appointmentRoutes');

app.use(
    '/api/appointments',
    appointmentRoutes
);
const financeRoutes =
require('./routes/financeRoutes');

app.use(
    '/api/finances',
    financeRoutes
);
require('dotenv').config();

const express = require('express');

const cors = require('cors');

const connectDB = require('./config/db');

const authRoutes =
require('./routes/authRoutes');

const app = express();

// CONECTAR DB

connectDB();

// MIDDLEWARES

app.use(cors());

app.use(express.json());

// ROUTES

app.use('/api/auth', authRoutes);

// SERVER

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Servidor rodando na porta ${PORT}`
    );

});