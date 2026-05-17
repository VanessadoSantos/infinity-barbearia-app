const express =
require('express');

const router =
express.Router();

// ========================================
// CONTROLLERS
// ========================================

const {

    register,

    login

} = require(

    '../controllers/authController'

);

// ========================================
// MIDDLEWARE
// ========================================

// FUTURO MIDDLEWARE JWT
// const authMiddleware =
// require('../middleware/authMiddleware');

// ========================================
// AUTH ROUTES
// ========================================

// ========================================
// REGISTER
// POST /api/auth/register
// ========================================

router.post(

    '/register',

    register

);

// ========================================
// LOGIN
// POST /api/auth/login
// ========================================

router.post(

    '/login',

    login

);

// ========================================
// TEST AUTH
// GET /api/auth/test
// ========================================

router.get(

    '/test',

    (req, res) => {

        res.status(200).json({

            success:true,

            message:
            'Rota auth funcionando.'

        });

    }

);

// ========================================
// EXPORT
// ========================================

module.exports = router;
