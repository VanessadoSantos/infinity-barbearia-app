const express =
require('express');

const router =
express.Router();

// ========================================
// CONTROLLERS
// ========================================

const {

    createFinance,

    getFinances,

    deleteFinance

} = require(

    '../controllers/financeController'

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
// CREATE FINANCE
// POST /api/finances
// ========================================

router.post(

    '/',

    // authMiddleware,

    createFinance

);

// ========================================
// GET ALL FINANCES
// GET /api/finances
// ========================================

router.get(

    '/',

    // authMiddleware,

    getFinances

);

// ========================================
// DELETE FINANCE
// DELETE /api/finances/:id
// ========================================

router.delete(

    '/:id',

    // authMiddleware,

    deleteFinance

);

// ========================================
// EXPORT
// ========================================

module.exports = router;
