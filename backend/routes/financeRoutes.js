const express = require('express');

const router = express.Router();

const {

    createFinance,
    getFinances,
    deleteFinance

} = require(
'../controllers/financeController'
);

// CREATE

router.post(
    '/',
    createFinance
);

// READ

router.get(
    '/',
    getFinances
);

// DELETE

router.delete(
    '/:id',
    deleteFinance
);

module.exports = router;