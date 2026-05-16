const mongoose = require('mongoose');

const FinanceSchema =
new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    type:{
        type:String,
        enum:[
            'entrada',
            'saida'
        ],
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    category:{
        type:String
    },

    description:{
        type:String
    }

}, {

    timestamps:true

});

module.exports =
mongoose.model(
    'Finance',
    FinanceSchema
);