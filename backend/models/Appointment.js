const mongoose = require('mongoose');

const AppointmentSchema =
new mongoose.Schema({

    clientName:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    service:{
        type:String,
        required:true
    },

    barber:{
        type:String
    },

    date:{
        type:String,
        required:true
    },

    hour:{
        type:String,
        required:true
    },

    status:{
        type:String,
        default:'Pendente'
    }

}, {

    timestamps:true

});

module.exports =
mongoose.model(
    'Appointment',
    AppointmentSchema
);