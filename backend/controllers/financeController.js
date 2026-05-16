const Finance =
require('../models/Finance');

// CREATE

exports.createFinance =
async (req, res) => {

    try{

        const finance =
        await Finance.create(req.body);

        res.status(201).json(finance);

    } catch(error){

        res.status(500).json(error);

    }

};

// READ

exports.getFinances =
async (req, res) => {

    try{

        const finances =
        await Finance.find()
        .sort({ createdAt:-1 });

        res.json(finances);

    } catch(error){

        res.status(500).json(error);

    }

};

// DELETE

exports.deleteFinance =
async (req, res) => {

    try{

        await Finance.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:'Registro removido'
        });

    } catch(error){

        res.status(500).json(error);

    }

};