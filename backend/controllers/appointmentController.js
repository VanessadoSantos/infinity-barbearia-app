const Appointment =
require('../models/Appointment');

// CREATE

exports.createAppointment =
async (req, res) => {

    try{

        const appointment =
        await Appointment.create(req.body);

        res.status(201).json(
            appointment
        );

    } catch(error){

        res.status(500).json(error);

    }

};

// READ

exports.getAppointments =
async (req, res) => {

    try{

        const appointments =
        await Appointment.find()
        .sort({ createdAt:-1 });

        res.json(appointments);

    } catch(error){

        res.status(500).json(error);

    }

};

// UPDATE

exports.updateAppointment =
async (req, res) => {

    try{

        const appointment =
        await Appointment.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new:true }

        );

        res.json(appointment);

    } catch(error){

        res.status(500).json(error);

    }

};

// DELETE

exports.deleteAppointment =
async (req, res) => {

    try{

        await Appointment.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:'Agendamento removido'
        });

    } catch(error){

        res.status(500).json(error);

    }

};