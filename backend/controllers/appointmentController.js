const Appointment =
require('../models/Appointment');

// ========================================
// CREATE APPOINTMENT
// ========================================

exports.createAppointment =
async (req, res) => {

    try{

        const {

            clientName,

            phone,

            service,

            barber,

            date,

            hour,

            notes

        } = req.body;

        // ========================================
        // VALIDATION
        // ========================================

        if(

            !clientName ||

            !phone ||

            !service ||

            !date ||

            !hour

        ){

            return res.status(400).json({

                success:false,

                message:
                'Preencha todos os campos obrigatórios.'

            });

        }

        // ========================================
        // CREATE
        // ========================================

        const appointment =
        await Appointment.create({

            clientName,

            phone,

            service,

            barber,

            date,

            hour,

            notes

        });

        // ========================================
        // RESPONSE
        // ========================================

        res.status(201).json({

            success:true,

            message:
            'Agendamento criado com sucesso.',

            appointment

        });

    } catch(error){

        res.status(500).json({

            success:false,

            message:
            'Erro ao criar agendamento.',

            error:error.message

        });

    }

};

// ========================================
// GET APPOINTMENTS
// ========================================

exports.getAppointments =
async (req, res) => {

    try{

        const appointments =
        await Appointment.find()

        .sort({

            createdAt:-1

        });

        // ========================================
        // RESPONSE
        // ========================================

        res.status(200).json({

            success:true,

            total:
            appointments.length,

            appointments

        });

    } catch(error){

        res.status(500).json({

            success:false,

            message:
            'Erro ao buscar agendamentos.',

            error:error.message

        });

    }

};

// ========================================
// UPDATE APPOINTMENT
// ========================================

exports.updateAppointment =
async (req, res) => {

    try{

        const appointment =
        await Appointment.findById(

            req.params.id

        );

        // ========================================
        // VALIDATION
        // ========================================

        if(!appointment){

            return res.status(404).json({

                success:false,

                message:
                'Agendamento não encontrado.'

            });

        }

        // ========================================
        // UPDATE
        // ========================================

        const updatedAppointment =
        await Appointment.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new:true,

                runValidators:true

            }

        );

        // ========================================
        // RESPONSE
        // ========================================

        res.status(200).json({

            success:true,

            message:
            'Agendamento atualizado.',

            appointment:
            updatedAppointment

        });

    } catch(error){

        res.status(500).json({

            success:false,

            message:
            'Erro ao atualizar agendamento.',

            error:error.message

        });

    }

};

// ========================================
// DELETE APPOINTMENT
// ========================================

exports.deleteAppointment =
async (req, res) => {

    try{

        const appointment =
        await Appointment.findById(

            req.params.id

        );

        // ========================================
        // VALIDATION
        // ========================================

        if(!appointment){

            return res.status(404).json({

                success:false,

                message:
                'Agendamento não encontrado.'

            });

        }

        // ========================================
        // DELETE
        // ========================================

        await Appointment.findByIdAndDelete(

            req.params.id

        );

        // ========================================
        // RESPONSE
        // ========================================

        res.status(200).json({

            success:true,

            message:
            'Agendamento removido com sucesso.'

        });

    } catch(error){

        res.status(500).json({

            success:false,

            message:
            'Erro ao remover agendamento.',

            error:error.message

        });

    }

};
