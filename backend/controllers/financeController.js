const Finance =
require('../models/Finance');

// ========================================
// CREATE FINANCE
// ========================================

exports.createFinance =
async (req, res) => {

    try{

        const {

            title,

            type,

            amount,

            category,

            description,

            status

        } = req.body;

        // ========================================
        // VALIDATION
        // ========================================

        if(

            !title ||

            !type ||

            !amount

        ){

            return res.status(400).json({

                success:false,

                message:
                'Preencha os campos obrigatórios.'

            });

        }

        // ========================================
        // CREATE
        // ========================================

        const finance =
        await Finance.create({

            title,

            type,

            amount,

            category,

            description,

            status

        });

        // ========================================
        // RESPONSE
        // ========================================

        res.status(201).json({

            success:true,

            message:
            'Registro financeiro criado.',

            finance

        });

    } catch(error){

        res.status(500).json({

            success:false,

            message:
            'Erro ao criar registro.',

            error:error.message

        });

    }

};

// ========================================
// GET FINANCES
// ========================================

exports.getFinances =
async (req, res) => {

    try{

        const finances =
        await Finance.find()

        .sort({

            createdAt:-1

        });

        // ========================================
        // TOTALS
        // ========================================

        const totalEntrada =
        finances

        .filter(

            item =>

            item.type ===
            'entrada'

        )

        .reduce(

            (acc, item) =>

            acc + item.amount,

            0

        );

        const totalSaida =
        finances

        .filter(

            item =>

            item.type ===
            'saida'

        )

        .reduce(

            (acc, item) =>

            acc + item.amount,

            0

        );

        const balance =
        totalEntrada - totalSaida;

        // ========================================
        // RESPONSE
        // ========================================

        res.status(200).json({

            success:true,

            total:

            finances.length,

            balance,

            totalEntrada,

            totalSaida,

            finances

        });

    } catch(error){

        res.status(500).json({

            success:false,

            message:
            'Erro ao buscar registros.',

            error:error.message

        });

    }

};

// ========================================
// DELETE FINANCE
// ========================================

exports.deleteFinance =
async (req, res) => {

    try{

        const finance =
        await Finance.findById(

            req.params.id

        );

        // ========================================
        // VALIDATION
        // ========================================

        if(!finance){

            return res.status(404).json({

                success:false,

                message:
                'Registro não encontrado.'

            });

        }

        // ========================================
        // DELETE
        // ========================================

        await Finance.findByIdAndDelete(

            req.params.id

        );

        // ========================================
        // RESPONSE
        // ========================================

        res.status(200).json({

            success:true,

            message:
            'Registro removido com sucesso.'

        });

    } catch(error){

        res.status(500).json({

            success:false,

            message:
            'Erro ao remover registro.',

            error:error.message

        });

    }

};
