const express =
require('express');

const router =
express.Router();

// ========================================
// CONTROLLERS
// ========================================

const {

    createAppointment,

    getAppointments,

    updateAppointment,

    deleteAppointment

} = require(

    '../controllers/appointmentController'

);

// ========================================
// MIDDLEWARE
// ========================================

// FUTURO JWT AUTH
// const authMiddleware =
// require('../middleware/authMiddleware');

// ========================================
// ROUTES
// ========================================

// ========================================
// CREATE APPOINTMENT
// POST /api/appointments
// ========================================

router.post(

    '/',

    // authMiddleware,

    createAppointment

);

// ========================================
// GET ALL APPOINTMENTS
// GET /api/appointments
// ========================================

router.get(

    '/',

    // authMiddleware,

    getAppointments

);

// ========================================
// UPDATE APPOINTMENT
// PUT /api/appointments/:id
// ========================================

router.put(

    '/:id',

    // authMiddleware,

    updateAppointment

);

// ========================================
// DELETE APPOINTMENT
// DELETE /api/appointments/:id
// ========================================

router.delete(

    '/:id',

    // authMiddleware,

    deleteAppointment

);

// ========================================
// TEST ROUTE
// GET /api/appointments/test
// ========================================

router.get(

    '/test',

    (req, res) => {

        res.status(200).json({

            success:true,

            message:
            'Rotas de agendamento funcionando.'

        });

    }

);

// ========================================
// EXPORT
// ========================================

module.exports = router;
