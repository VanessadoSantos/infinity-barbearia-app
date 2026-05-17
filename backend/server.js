// ========================================
// IMPORTS
// ========================================

require('dotenv').config();

const express =
require('express');

const cors =
require('cors');

// ========================================
// DATABASE
// ========================================

const connectDB =
require('./config/db');

// ========================================
// ROUTES
// ========================================

const authRoutes =
require('./routes/authRoutes');

const appointmentRoutes =
require('./routes/appointmentRoutes');

const financeRoutes =
require('./routes/financeRoutes');

// ========================================
// APP
// ========================================

const app = express();

// ========================================
// DATABASE CONNECTION
// ========================================

connectDB();

// ========================================
// MIDDLEWARES
// ========================================

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended:true
    })
);

// ========================================
// API ROUTES
// ========================================

// AUTH

app.use(
    '/api/auth',
    authRoutes
);

// APPOINTMENTS

app.use(
    '/api/appointments',
    appointmentRoutes
);

// FINANCES

app.use(
    '/api/finances',
    financeRoutes
);

// ========================================
// TEST ROUTE
// ========================================

app.get('/', (req, res) => {

    res.status(200).json({

        success:true,

        message:
        'Infinity Barbearia API funcionando.'

    });

});

// ========================================
// 404 ROUTE
// ========================================

app.use((req, res) => {

    res.status(404).json({

        success:false,

        message:'Rota não encontrada.'

    });

});

// ========================================
// GLOBAL ERROR HANDLER
// ========================================

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({

        success:false,

        message:
        'Erro interno do servidor.'

    });

});

// ========================================
// SERVER
// ========================================

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(

        `🚀 Servidor rodando:
        http://localhost:${PORT}`

    );

});
